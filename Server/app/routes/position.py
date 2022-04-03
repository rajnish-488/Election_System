from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Position
from ..serializers import PositionSerializer


@csrf_exempt
def position(request):

    if request.method == 'GET':
        snippets = Position.objects.all()
        serializer = PositionSerializer(snippets, many=True)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')

    elif request.method == 'POST':
        sts = io.BytesIO(request.body)
        data = JSONParser().parse(sts)
        serializer = PositionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            js_data = JSONRenderer().render(serializer.data)
            return HttpResponse(js_data, content_type='application/json')

        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def PositionID(request, id):

    try:
        snippet = Position.objects.get(id=id)
    except Position.DoesNotExist:
        return HttpResponse("The id don't exist", status=404)
    if request.method == "GET":
        serializer = PositionSerializer(snippet)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')

    if request.method == "PUT":
        sts = io.BytesIO(request.body)
        data = JSONParser().parse(sts)
        serializer = PositionSerializer(snippet, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            js_data = JSONRenderer().render(serializer.data)
            return HttpResponse(js_data, content_type='application/json')
        return JsonResponse(serializer.errors, status=400)

    if request.method == "DELETE":
        snippet.delete()
        return HttpResponse("The contect is deleted", status=200)