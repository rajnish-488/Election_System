from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Candidate,Position,Voters
from ..serializers import CandidateSerializer, PositionSerializer,VotersSerializer

@csrf_exempt
def solve(request,id):

    if request.method == 'GET':
        pos = Position.objects.get(id=id)
        spos = PositionSerializer(pos)
        candl=spos.data['candidate']
        cl=[]
        for x in range(len(candl)):
            cand = Candidate.objects.get(id=candl[x])
            scand=CandidateSerializer(cand)
            cl.append(scand.data)
        ans=[]
        for x in range(len(cl)):
            user=Voters.objects.get(id=cl[x]['voters'])
            suser=VotersSerializer(user)
            dir={
                "posid": id,
                "candid": cl[x]['id'],
                "userid": suser.data['id'],
                "candissue": cl[x]['issue'],
                "candslogan": cl[x]['slogan'],
                "candskill": cl[x]['skill'],
                "username": suser.data['name']
            }
            ans.append(dir)
        js_data = JSONRenderer().render(ans)
        return HttpResponse(js_data, content_type='application/json')