from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)
app.secret_key = "supersecretkey"

# Cambia esta URL si tu backend está en otro puerto/dominio
API_URL = "http://localhost:3000/api"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        data = {
            "username": request.form["username"],
            "email": request.form["email"],
            "password": request.form["password"]
        }
        response = requests.post(f"{API_URL}/auth/register", json=data)
        if response.status_code == 201:
            flash("Usuario registrado con éxito", "success")
            return redirect(url_for("home"))
        else:
            flash(response.json().get("error", "Error en el registro"), "danger")
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = {
            "email": request.form["email"],
            "password": request.form["password"]
        }
        response = requests.post(f"{API_URL}/auth/login", json=data)
        if response.status_code == 200:
            flash("Inicio de sesión exitoso", "success")
            return redirect(url_for("home"))
        else:
            flash(response.json().get("error", "Credenciales incorrectas"), "danger")
    return render_template("login.html")

@app.route("/create_post", methods=["GET", "POST"])
def create_post():
    if request.method == "POST":
        data = {
            "title": request.form["title"],
            "content": request.form["content"],
            "userId": request.form["userId"]
        }
        response = requests.post(f"{API_URL}/posts/create", json=data)
        if response.status_code == 201:
            flash("Publicación creada con éxito", "success")
            return redirect(url_for("list_posts"))
        else:
            flash(response.json().get("error", "Error al crear publicación"), "danger")
    return render_template("create_post.html")

@app.route("/posts")
def list_posts():
    response = requests.get(f"{API_URL}/posts/list")
    if response.status_code == 200:
        posts = response.json()
        return render_template("posts.html", posts=posts)
    else:
        flash("No se pudieron obtener las publicaciones", "danger")
        return render_template("posts.html", posts=[])

@app.route("/posts/user/<user_id>")
def list_user_posts(user_id):
    response = requests.get(f"{API_URL}/posts/user/{user_id}")
    if response.status_code == 200:
        posts = response.json()
        return render_template("posts.html", posts=posts)
    else:
        flash("No se pudieron obtener las publicaciones del usuario", "danger")
        return render_template("posts.html", posts=[])

if __name__ == "__main__":
    app.run(debug=True, port=5000)
