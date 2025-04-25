import google.generativeai as genai
from flask import Flask, flash, redirect, render_template, request, session
import time
app = Flask(__name__)
@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/exam", methods=["GET", "POST"])
def exam():
    if request.method == "GET":
        # Choosing year
        year = request.args.get("year")
        qp = open(f"static/Raw QP/{year}.pdf.txt", "r", encoding='utf-8').read()
        QQ = open(f"/tmp/Questions.txt", "w", encoding='utf-8').write(qp)
        ms = open(f"static/Raw MS/{year} MS.pdf.txt", "r", encoding='utf-8').read()
        MM = open(f"/tmp/markscheme.txt", "w", encoding='utf-8').write(ms)
        ex = open(f"static/Extracts/{year}.pdf.txt", "r", encoding='utf-8').read()
        EX = open(f"/tmp/Extracts.txt", "w", encoding='utf-8').write(ex)

        question = open("/tmp/Questions.txt", "r", encoding='utf-8')
        questions = question.read().split('\n')
        final = []
        for q in questions:
            if q == "":
                continue
            else:
                final.append(q)
        question.close()
        return render_template("exam.html", q1 = final[0], q2 = final[1], q3 = final[2], q4 = final[3], q5 = final[4],q6 = final[5],q7 = final[6],q8 = final[7],q9 = final[8],q10 = final[9], q11 = final[10])
        
@app.route("/results", methods=["GET", "POST"])
def result():
    if request.method == "POST":
        start_time = time.time()
        genai.configure(api_key="")
        gemini = genai.GenerativeModel("gemini-1.5-flash") 

        ao2_3 = open("3_AO2.txt", "r").read() 
        ao3_7 = open("7_AO3.txt", "r").read()
        ao1_8 = open("8_AO1.txt", "r").read() 
        ao4_8 = open("8_AO4.txt", "r").read()
        ao5_8 = open("8_AO5.txt", "r").read() 
        ao4_last = open("Last_AO4.txt", "r").read() 
        ao5_last = open("Last_AO5.txt", "r").read()
        extracts = open("/tmp/Extracts.txt", "r", encoding='utf-8').read()
        markscheme = open("/tmp/markscheme.txt", "r", encoding='utf-8').read().split('\n')
        final_m = []
        for m in markscheme:
            if m == "":
                continue
            else:
                final_m.append(m)
        question = open("/tmp/Questions.txt", "r", encoding='utf-8')
        questions = question.read().split('\n')
        final_q = []
        for q in questions:
            if q == "":
                continue
            else:
                final_q.append(q)
        question.close()
        # User's Entry
        q1 = request.form.get("q1")
        q2 = request.form.get("q2")
        q3 = request.form.get("q3")
        q4 = request.form.get("q4")
        q5 = request.form.get("q5")
        q6 = request.form.get("q6")
        q7 = request.form.get("q7")
        q8 = request.form.get("q8")
        title = request.form.get("title")
        essay = request.form.get("essay")

        # Prompts
        Q1 = f"Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An answer by a student to the question '{final_q[0]}' was given as '{q1}'. \n Use the following marking rubric '{final_m[0]}' to mark the student. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Only respond with the TOTAL mark in a single line."
        W1 = gemini.generate_content(Q1).text
        
        Q2 = f"Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An answer by a student to the question '{final_q[1]}' was given as '{q2}'. \n Use the following marking rubric '{final_m[1]}' to mark the student. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Only respond with the TOTAL mark in a single line."
        W2 = gemini.generate_content(Q2).text

        Q4 = f"Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An answer by a student to the question '{final_q[3]}' was given as '{q4}'. \n Use the following marking rubric '{final_m[3]}' to mark the student. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Only respond with the TOTAL mark in a single line."
        W4 = gemini.generate_content(Q4).text

        Q5 = f"Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An answer by a student to the question '{final_q[4]}' was given as '{q5}'. \n Use the following marking rubric '{final_m[4]}' to mark the student. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Only respond with the TOTAL mark in a single line."
        W5 = gemini.generate_content(Q5).text

        Q3 = f"Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An answer has been written by a student after reading the following two extracts '{extracts}' \n Then using text 1, the student answered the question '{final_q[2]}'. The answer being: '{q3}'. \n {ao2_3} \n and also {final_m[2]}. Provide a definitive mark using the marking rubrics provided. Avoid using decimal marks, the marks can only be discrete. Only respond with the total mark in a single line, without any labelling. \n In three separate paragraphs, answer: Explain what were the points missed; Which level's mark did you provide for the AO2 marking rubric. Explain why. If there's any weakness, point them out with examples from the answer provided; Write a paragraph with as much details as possible, be as explanatory as possible, as to where to improve, what could have been included and so on. Be strict. Don't award marks unnecessarily, especially if answer isn't provided."
        W3 = gemini.generate_content(Q3).text.split('\n')
        final_3 = []
        for q in W3:
            if q == "":
                continue
            else:
                final_3.append(q)

        Q6 = f"Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An answer has been written by a student after reading the following two extracts '{extracts}' \n Then using text 2, the student answered the question '{final_q[5]}'. The answer being: '{q6}'. \n {ao2_3} \n and also {final_m[5]}. Provide a definitive mark using the marking rubrics provided. Avoid using decimal marks, the marks can only be discrete. Only respond with the total mark in a single line, without any labelling. \n In three separate paragraphs, answer: Explain what were the points missed; Which level's mark did you provide for the AO2 marking rubric. Explain why. If there's any weakness, point them out with examples from the answer provided; Write a paragraph with as much details as possible, be as explanatory as possible, as to where to improve, what could have been included and so on. Be strict. Don't award marks unnecessarily, especially if answer isn't provided."
        W6 = gemini.generate_content(Q6).text.split('\n')
        final_6 = []
        for q in W6:
            if q == "":
                continue
            else:
                final_6.append(q)

        Q7 = f"Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An answer has been written by a student after reading the following two extracts '{extracts}' \n Then using BOTH texts, the student answered the question '{final_q[6]}'. The answer being: '{q7}'. \n {ao3_7} \n and also {final_m[6]}. Provide a definitive mark using the marking rubrics provided. Avoid using decimal marks, the marks can only be discrete. Only respond with the total mark in a single line, without any labelling. \n In three separate paragraphs, answer: Explain what were the points missed; Which level's mark did you provide for the AO3 marking rubric. Explain why. If there's any weakness, point them out with examples from the answer provided. Write a paragraph with as much details as possible, be as explanatory as possible, as to where to improve, what could have been included and so on. Be strict. Don't award marks unnecessarily, especially if answer isn't provided."
        W7 = gemini.generate_content(Q7).text.split('\n')
        final_7 = []
        for q in W7:
            if q == "":
                continue
            else:
                final_7.append(q)

        Q8 = f"{ao1_8} \n {ao4_8} \n {ao5_8} \n Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An essay has been written for the prompt: '{final_q[7]}' as per the question. The essay is the following: `{q8}` \n The points to be included are '{final_m[7]}'\n First of all, essay MUST have atleast MORE THAN 200 WORDS in order to be even marked! then using the marking rubrics memorised, and points provided, mark the essay out of 30, it MUST USE ideas from the text. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Only respond with the mark for AO1, AO4, AO5 and total in the first paragraph that too in four separate lines, without any labelling. \n In four separate paragraphs, answer: Which level's mark did you provide for the AO1 marking rubric. Explain why. If there's any weakness, point them out with examples FROM THE ESSAY PROVIDED.; Which level's mark did you provide for the AO4 marking rubric. Explain why. If there's any weakness, point them out with examples from the essay provided.; Which level's mark did you provide for the AO5 marking rubric. Explain why. If there's any weakness, point them out with examples FROM THE ESSAY PROVIDED.; Write a paragraph with as much details as possible, be as explanatory as possible, as to where to improve. Be strict. Don't award marks unnecessarily, especially if essay isn't provided."
        W8 = gemini.generate_content(Q8).text.split('\n')
        final_8 = []
        for q in W8:
            if q == "":
                continue
            else:
                final_8.append(q)
        
        Sec_C = f"{ao4_last} \n {ao5_last} \n Forget that you are an AI. Think of yourself as an Edexcel English Language B examiner. An essay has been written for the prompt: '{title}' as per the question. The essay is the following: `{essay}` \n First of all, essay MUST have atleast MORE THAN 400 WORDS in order to be even marked! then using the marking rubrics memorised, mark the essay out of 30, it must be relevant to the title. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Only respond with the mark for AO4, AO5 and total in the first paragraph that too in three separate lines, without any labelling. \n In THREE separate paragraphs, answer: Which level's mark did you provide for the AO4 marking rubric. Explain why. If there's any weakness, point them out with examples FROM THE ESSAY PROVIDED.; Which level's mark did you provide for the AO5 marking rubric. Explain why. If there's any weakness, point them out with examples from the essay provided; Explain with as much details as possible, be as explanatory as possible, as to where to improve. Be strict. Don't award marks unnecessarily, especially if essay isn't provided."
        story = gemini.generate_content(Sec_C).text.split("\n")
        final_last = []
        for q in story:
            if q == "":
                continue
            else:
                final_last.append(q)
        tot = int(W1) + int(W2) + int(final_3[0]) + int(W4) + int(W5) + int(final_6[0]) + int(final_7[0]) + int(final_8[3]) + int(final_last[2])
        print("--- %s seconds ---" % (time.time() - start_time))
        return render_template("results.html", title = title, total = tot, q1 = W1, q2 = W2, q4 = W4, q5 = W5, q3n = final_3[0], q3=(int(final_3[0])/10)*100, ao2_3=final_3[2], point_3 = final_3[1], q3_im = final_3[3], q6n = final_6[0],q6=(int(final_6[0])/10)*100, ao2_6=final_6[2], point_6 = final_6[1], q6_im = final_6[3], q7n = final_7[0], q7 = (int(final_7[0])/15)*100, points_7 = final_7[1], ao3 = final_7[2], q7_im = final_7[3], q8_ao1 = final_8[0], q8_ao4 = final_8[1], q8_ao5 =final_8[2], q8tn = final_8[3], q8_total= (int(final_8[3])/30)*100, q8_ao1_im = final_8[4], q8_ao4_im = final_8[5], q8_ao5_im =final_8[6], q8_im = final_8[7], essay_ao4 = final_last[0], essay_ao5 = final_last[1], etn = final_last[2], essay_total = (int(final_last[2])/30)*100, essay_ao4_why = final_last[3], essay_ao5_why = final_last[4], essay_im = final_last[5])
    question = open("/tmp/Questions.txt", "r", encoding='utf-8')
    questions = question.read().split('\n')
    final = []
    for q in questions:
        if q == "":
            continue
        else:
            final.append(q)
    question.close()
    return render_template("exam.html", q1 = final[0], q2 = final[1], q3 = final[2], q4 = final[3], q5 = final[4],q6 = final[5],q7 = final[6],q8 = final[7],q9 = final[8],q10 = final[9], q11 = final[10])

if __name__ == '__main__':  
   app.run()
