from flask import Flask, render_template

app = Flask("secret-zork", static_folder='static')

@app.route("/")
def run():
    return render_template("index.html")


if __name__ == '__main__':
    app.run()