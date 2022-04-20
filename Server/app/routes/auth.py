import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io

@csrf_exempt
def Auth(request):

    if request.method == 'GET':
        js_data=""
        f=open("C:/Users/pc/Desktop/Election_System/Server/app/routes/p.json",'r')
        js_data=f.read()
        f.close()
        return HttpResponse(js_data, content_type='application/json')

    if request.method == 'POST':
        sts = io.BytesIO(request.body)
        data = JSONParser().parse(sts)
        data = json.dumps(data)
        f=open("C:/Users/pc/Desktop/Election_System/Server/app/routes/p.json", 'w')
        f.write(data)
        f.close()
        return HttpResponse(data, content_type='application/json')
    