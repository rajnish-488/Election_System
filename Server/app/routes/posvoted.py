from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Voters, Vote
from ..serializers import VotersSerializer, VoteSerializer

@csrf_exempt
def solve(request, username):
    try:
        snippet = Voters.objects.get(username= username)
    except Voters.DoesNotExist:
        return HttpResponse("The Username donet exist", status=404)
    if request.method == "GET":
        serializer = VotersSerializer(snippet)
        ans=[]
        for x in range(len(serializer.data["vote"])):
            vote = Vote.objects.get(id=serializer.data["vote"][x])
            svote = VoteSerializer(vote)
            ans.append(svote.data["position"])
        js_data = JSONRenderer().render(ans)
        return HttpResponse(js_data, content_type='application/json')
    