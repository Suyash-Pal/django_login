import os, json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from twilio.rest import Client

load_dotenv()

account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
verify_sid = os.getenv('TWILIO_VERIFY_SID')
client = Client(account_sid, auth_token)

def index(request):
    return render(request, 'index.html')
from django.shortcuts import redirect

def show_details_form(request):
    return render(request, 'details.html')

def submit_details(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        mobile = request.POST.get('mobile')
        # TODO: Save or process this data
        return JsonResponse({'message': f'Thank you, {name}!'})
@csrf_exempt
def send_otp(request):
    data = json.loads(request.body)
    mobile = data.get('mobile')
    verification = client.verify.services(verify_sid).verifications.create(to=mobile, channel='sms')
    return JsonResponse({'status': verification.status})

@csrf_exempt
def verify_otp(request):
    data = json.loads(request.body)
    mobile = data.get('mobile')
    otp = data.get('otp')
    verification_check = client.verify.services(verify_sid).verification_checks.create(to=mobile, code=otp)
    return JsonResponse({'status': verification_check.status})