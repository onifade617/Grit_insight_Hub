from django.shortcuts import render


def index(request):
    template_data = {
        'title': "Grit Insight Hub | Driving social impact through digital solutions",
        'description': (
            "Grit Insight Hub drives social impact through digital solutions: smart products, "
            "workflow automation, data systems and AI for MSMEs, health, education, logistics and public services."
        ),
    }
    return render(request, 'home/index.html', {'template_data': template_data})


def about(request):
    template_data = {
        'title': "About | Grit Insight Hub",
        'description': (
            "Our vision, mission and values: leveraging innovative digital solutions to create "
            "smarter, more sustainable and meaningful impact for communities and society."
        ),
    }
    return render(request, 'home/about.html', {'template_data': template_data})


def products(request):
    template_data = {
        'title': "Solutions | Grit Insight Hub",
        'description': (
            "Digital products, workflow automation, data pipelines, dashboards and AI for MSMEs "
            "and for health, education, agri-food and public-sector programmes."
        ),
    }
    return render(request, 'home/products.html', {'template_data': template_data})


def projects(request):
    template_data = {
        'title': "Projects | Grit Insight Hub",
        'description': (
            "Selected work: Lafiya AI, a multilingual voice-first health platform; natlas-health, an open-source "
            "N-ATLaS developer kit; Seedbed, a portal for low-fee schools; and Smart-PODSS for port operations."
        ),
    }
    return render(request, 'home/projects.html', {'template_data': template_data})
