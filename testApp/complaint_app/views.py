from rest_framework.viewsets import ModelViewSet
from django.db.models import Count
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class ComplaintViewSet(ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.all()
  def list(self, request):
    # Get all complaints from the user's district
    user = UserProfile.objects.get(pk=request.user.id)
    filtered_queryset = Complaint.objects.all().filter(account="NYCC{district}".format(district=user.district))
    serializer = ComplaintSerializer(filtered_queryset, many=True)
    return Response(serializer.data)

class OpenCasesViewSet(ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get only the open complaints from the user's district
    # Filter out objects with close date
    user = UserProfile.objects.get(pk=request.user.id)
    queryset = Complaint.objects.filter(account="NYCC{district}".format(district=user.district)).filter(closedate__isnull=True)
    serializer = ComplaintSerializer(queryset, many=True)
    
    return Response(serializer.data)

class ClosedCasesViewSet(ModelViewSet):
  http_method_names = ['get'] 
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.all() 
  def list(self, request):
    # Get only complaints that are close from the user's district
    # Filter out objects with no close date
    user = UserProfile.objects.get(pk=request.user.id)
    filtered_queryset = Complaint.objects.filter(account="NYCC{district}".format(district=user.district)).filter(closedate__isnull=False)
    serializer = ComplaintSerializer(filtered_queryset, many=True)
    return Response(serializer.data)
    
class TopComplaintTypeViewSet(ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    # Return a sorted object of the top 3 complaint types
    user = UserProfile.objects.get(pk=request.user.id)
    filtered_queryset = Complaint.objects.filter(account="NYCC{district}".format(district=user.district)).values("complaint_type").annotate(Count("id")).order_by("-complaint_type")
    serializer = ComplaintSerializer(filtered_queryset, many=True)
    return Response(serializer.data[:3])