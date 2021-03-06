from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ImageDataTo
from .serializers import *
from ImageFunction.ImageFunction import translate_string

class ImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ImageDataSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            buf=serializer.save()
            image_url=buf.image_url.name
            print(image_url)
            from_language=buf.from_language
            to_language=buf.to_language

            translated_text = translate_string(image_url, to_lang=to_language, from_lang=from_language)
            print(translated_text)
            return Response(data=translated_text, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# @api_view(['POST'])
# def Image_request(request):
#     """
#  Add new image for function translate and get data after function translate.
#  """
#
#     if request.method == 'POST':
#         serializer = ImageDataSerializer(data=request.data)
#         print(serializer)
#         if serializer.is_valid():
#             # serializer.save()
#             image_url = serializer.data['image_url']
#             from_language = serializer.data['from_language']
#             print(from_language)
#             to_language = serializer.data['to_language']
#             translated_text = translate_string(image_url, to_lang=to_language, from_lang=from_language)
#             return Response(data=translated_text, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # if request.method == 'GET':
    #     data = []
    #     customers = ImageDataTo.objects.all()
    #
    #     try:
    #         data = paginator.page(page)
    #     except PageNotAnInteger:
    #         data = paginator.page(1)
    #     except EmptyPage:
    #         data = paginator.page(paginator.num_pages)
    #
    #     serializer = ImageDataSerializer(data, context={'request': request})
    #     if data.has_next():
    #         nextPage = data.next_page_number()
    #     if data.has_previous():
    #         previousPage = data.previous_page_number()
    #
    #     return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
    #                      'nextlink': '/api/customers/?page=' + str(nextPage),
    #                      'prevlink': '/api/customers/?page=' + str(previousPage)})





# @api_view(['GET', 'PUT', 'DELETE'])
# def customers_detail(request, pk):
#     """
#  Retrieve, update or delete a customer by id/pk.
#  """
#     try:
#         customer = ImageDataTo.objects.get(pk=pk)
#     except ImageDataTo.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = ImageDataSerializer(customer, context={'request': request})
#         return Response(serializer.data)
#
#     elif request.method == 'DELETE':
#         customer.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)