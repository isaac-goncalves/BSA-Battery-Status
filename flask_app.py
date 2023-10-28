from flask import Flask, render_template, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data')
def get_battery_data():
    result = subprocess.run(["powershell", "gwmi -Class batterystatus -Namespace root\\wmi"], capture_output=True, text=True)
    output = result.stdout
    lines = output.split('\n')
    charge_rate = None
    discharge_rate = None
    voltage = None
    for line in lines:
        if "ChargeRate" in line:
            charge_rate = int(line.split(':')[-1])
        elif "DischargeRate" in line:
            discharge_rate = int(line.split(':')[-1])
        elif "Voltage" in line:
            voltage = int(line.split(':')[-1])
    return jsonify(chargeRate=charge_rate, dischargeRate=discharge_rate, voltage=voltage)

if __name__ == '__main__':
    app.run(debug=True)