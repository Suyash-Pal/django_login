const phoneLengthByCountry = {
    '+91': 10,
    '+1': 10,
    '+44': 10,
    '+61': 9,
    '+81': 10
};
function validateMobileLength() {
    const countryCode = document.getElementById("country").value;
    const mobileInput = document.getElementById("mobile");
    const expectedLength = phoneLengthByCountry[countryCode];
    const actualLength = mobileInput.value.trim().length;

    if (expectedLength && actualLength !== expectedLength) {
        alert(`Mobile number must be exactly ${expectedLength} digits for ${countryCode}`);
        return false;
    }
    return true;
}

document.getElementById("country").addEventListener("change", function () {
    const countryCode = this.value;
    const phoneInput = document.getElementById("mobile");
    
    if (phoneLengthByCountry[countryCode]) {
        phoneInput.maxLength = phoneLengthByCountry[countryCode];
        phoneInput.placeholder = `Enter ${phoneLengthByCountry[countryCode]} digit number`;
    } else {
        phoneInput.maxLength = 15;
        phoneInput.placeholder = "Enter Mobile Number";
    }
});
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

async function sendOTP() {
    const countryCode = document.getElementById("country").value;
    const mobile = countryCode + document.getElementById("mobile").value;
    if (!validateMobileLength()) return;
    const res = await fetch('/send-otp/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({ mobile })
    });
    const data = await res.json();
    document.getElementById("result").innerText = `OTP sent: ${data.status}`;
}

async function verifyOTP() {
    const countryCode = document.getElementById("country").value;
    const mobile = countryCode + document.getElementById("mobile").value;
    const otp = document.getElementById("otp").value;
    const res = await fetch('/verify-otp/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({ mobile, otp })
    });
    const data=await res.json();
    if (data.status === 'approved') {
        window.location.href = '/details/';
    } else {
        document.getElementById("result").innerText = `Verification failed`;
    }

}