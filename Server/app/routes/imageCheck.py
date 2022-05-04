from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io
from ..models import Images
from ..serializers import ImagesSerializer
from .face_rec.face import face_reco


@csrf_exempt
def imagesID(request, id):

    if request.method == "POST":
        sts = io.BytesIO(request.body)
        img1 = JSONParser().parse(sts)
        try:
            snippet = Images.objects.get(userid=id)
        except Images.DoesNotExist:
            return HttpResponse("The id don't exist", status=404)
        serializer = ImagesSerializer(snippet)
        img2=serializer.data['img']
        fr=face_reco()
        ansit=fr.recognize(img1['img'],img2)
        ansdo=False
        if True in ansit:
            ansdo=True
        else:
            ansdo=False
        ans={
            "permit": ansdo
        }
        js_data = JSONRenderer().render(ans)
        return HttpResponse(js_data, content_type='application/json')

