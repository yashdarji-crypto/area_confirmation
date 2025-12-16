from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

EXCEL_FILE = "members.xlsx"

@app.route("/", methods=["GET", "POST"])
def index():
    # Read Excel file
    df = pd.read_excel(EXCEL_FILE)

    # Read MEMBERS column
    members = df["MEMBERS"].dropna().tolist()
    message = ""

    if request.method == "POST":
        selected_member = request.form["member"]
        new_area = request.form["area"]

        # Update NEW FLAT AREA for selected member
        df.loc[df["MEMBERS"] == selected_member, "NEW FLAT AREA"] = new_area

        # Save back to Excel
        df.to_excel(EXCEL_FILE, index=False)

        message = "✅ New flat area saved successfully!"

    return render_template(
        "index.html",
        members=members,
        message=message
    )

if __name__ == "__main__":
    app.run(debug=True)

