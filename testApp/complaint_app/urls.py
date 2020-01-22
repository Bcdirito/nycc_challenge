from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, ConstituentsComplaintViewSet

router = routers.SimpleRouter()
router.register(r'openCases', OpenCasesViewSet, basename='openCases')
router.register(r'closedCases', ClosedCasesViewSet, basename='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, basename='topComplaints')
router.register(r'constituentComplants', ConstituentsComplaintViewSet, basename="costituentComplaints")
router.register(r'', ComplaintViewSet, basename='complaint')


urlpatterns = router.urls
