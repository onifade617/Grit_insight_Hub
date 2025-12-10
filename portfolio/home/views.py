from django.shortcuts import render

# Create your views here.
def index(request):
    template_data = {
        'title': "Grit Insight Hub",
    }
    return render(request, 'home/index.html', {'template_data' : template_data})

def about(request):
    template_data = {
        'title': "About Grit Insight Hub",
    }
    return render(request, 'home/about.html', {'template_data' : template_data})


def products(request):
    template_data = {
        'title': "Grit Insight Hub Projects",
    }
    return render(request, 'home/products.html', {'template_data' : template_data})