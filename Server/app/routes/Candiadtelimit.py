from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Candidate
from ..serializers import CandidateSerializer

@csrf_exempt
def candidateLimit(request):

    if request.method == 'GET':
        snippets = Candidate.objects.raw("SELECT * FROM Candidate ORDER BY id DESC LIMIT 10")
        serializer = CandidateSerializer(snippets, many=True)
        js_data = JSONRenderer().render(serializer.data)
        return HttpResponse(js_data, content_type='application/json')
