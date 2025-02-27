from django.shortcuts import render

def hbd(request):
    return render(request , "index.html")

def gift(request):
    return render(request , "gift.html")