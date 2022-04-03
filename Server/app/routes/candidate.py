from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Candidate
from ..serializers import CandidateSerializer


@csrf_exempt
def candidate(request):

    if request.method == 'GET':
        snippets = Candidate.objects.all()
        serializer = CandidateSerializer(snippets, many=True)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')

    elif request.method == 'POST':
        sts = io.BytesIO(request.body)
        data = JSONParser().parse(sts)
        serializer = CandidateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            js_data = JSONRenderer().render(serializer.data)
            return HttpResponse(js_data, content_type='application/json')

        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def CandidateID(request, id):

    try:
        snippet = Candidate.objects.get(id=id)
    except Candidate.DoesNotExist:
        return HttpResponse("The id don't exist", status=404)
    if request.method == "GET":
        serializer = CandidateSerializer(snippet)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')

    if request.method == "PUT":
        sts = io.BytesIO(request.body)
        data = JSONParser().parse(sts)
        serializer = CandidateSerializer(snippet, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            js_data = JSONRenderer().render(serializer.data)
            return HttpResponse(js_data, content_type='application/json')
        return JsonResponse(serializer.errors, status=400)

    if request.method == "DELETE":
        snippet.delete()
        return HttpResponse("The contect is deleted", status=200)