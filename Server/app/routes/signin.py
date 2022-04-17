from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Admin
from ..serializers import AdminSerializer
from ..models import Voters
from ..serializers import VotersSerializer





@csrf_exempt
def signin(request, username):
    print(username)
    try:
        snippet = Admin.objects.get(username= username)
    except Admin.DoesNotExist:
        return HttpResponse("The Username donet exist", status=404)
    if request.method == "GET":
        serializer = AdminSerializer(snippet)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')


@csrf_exempt
def signinVoter(request, username):
    print(username)
    try:
        snippet = Voters.objects.get(username= username)
    except Voters.DoesNotExist:
        return HttpResponse("The Username donet exist", status=404)
    if request.method == "GET":
        serializer = VotersSerializer(snippet)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')
    