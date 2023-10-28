import subprocess
import json
import time

def collect_battery_data():
    while True:
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
        data = {
            "chargeRate": charge_rate,
            "dischargeRate": discharge_rate,
            "voltage": voltage
        }
        with open("battery_data.json", "w") as file:
            json.dump(data, file)
        time.sleep(1)

if __name__ == "__main__":
    collect_battery_data()