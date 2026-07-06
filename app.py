from datetime import datetime
from flask import Flask, render_template

app = Flask(__name__)


@app.context_processor
def inject_year():
    return {"year": datetime.now().year}


@app.route("/")
def index():
    return render_template("index.html", active="home")


@app.route("/roadmap")
def roadmap():
    return render_template("roadmap.html", active="roadmap")


@app.route("/courses")
def courses():
    return render_template("courses.html", active="courses")


@app.route("/tools")
def tools():
    return render_template("tools.html", active="tools")


@app.route("/prompts")
def prompts():
    return render_template("prompts.html", active="prompts")


@app.route("/workflows")
def workflows():
    return render_template("workflows.html", active="workflows")


@app.route("/use-cases")
def usecases():
    return render_template("usecases.html", active="usecases")


@app.route("/projects")
def projects():
    return render_template("projects.html", active="projects")


@app.route("/monetize")
def monetize():
    return render_template("monetize.html", active="monetize")


@app.route("/glossary")
def glossary():
    return render_template("glossary.html", active="glossary")


@app.route("/skill-check")
def skillcheck():
    return render_template("skillcheck.html", active="skillcheck")


if __name__ == "__main__":
    app.run(debug=True, port=3005)
