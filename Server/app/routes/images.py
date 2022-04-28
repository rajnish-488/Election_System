from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Images
from ..serializers import ImagesSerializer


@csrf_exempt
def images(request):

    if request.method == 'GET':
        snippets = Images.objects.all()
        serializer = ImagesSerializer(snippets, many=True)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')
    else:
        return HttpResponse("bad request", content_type='application/json')

@csrf_exempt
def imagesID(request, id):

    if request.method == "GET":
        try:
            snippet = Images.objects.get(userid=id)
        except Images.DoesNotExist:
            return HttpResponse("The id don't exist", status=404)
        serializer = ImagesSerializer(snippet)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')

    if request.method == "PUT":
        yes=True
        try:
            snippet = Images.objects.get(userid=id)
        except Images.DoesNotExist:
            yes=False
        if yes:
            sts = io.BytesIO(request.body)
            data = JSONParser().parse(sts)
            serializer = ImagesSerializer(snippet, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                js_data = JSONRenderer().render(serializer.data)
                return HttpResponse(js_data, content_type='application/json')
            return JsonResponse(serializer.errors, status=400)
        else:
            sts = io.BytesIO(request.body)
            data = JSONParser().parse(sts)
            serializer = ImagesSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                js_data = JSONRenderer().render(serializer.data)
                return HttpResponse(js_data, content_type='application/json')

            return JsonResponse(serializer.errors, status=400)

    if request.method == "DELETE":
        snippet.delete()
        return HttpResponse("The contect is deleted", status=200)