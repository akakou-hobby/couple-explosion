function getDevices(deviceInfos) {
    let devices = []

    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind == 'videoinput') {
            devices.push({
                label: deviceInfo.label,
                id: deviceInfo.deviceId
            });
        }
    }
    console.log(devices);

    let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    console.log(supportedConstraints);

    return devices
}

function selectDevice(devices) {
    capture = createCapture(VIDEO);
    capture.hide();

    for (let device of devices) {
        var result = confirm(`カメラ"${device.label}(${device.id})"を使いますか？\n（使わない場合、別のカメラを使うかこの後聞きます）`);

        if (!result) continue

        var constraints = {
            video: {
                deviceId: {
                    exact: device.id
                },
            }
        };

        capture = createCapture(constraints);
        return capture
    }

    alert("カメラが見つかりませんでした。リロードしてださい。");
    throw new Error("カメラが見つかりませんでした。")
}