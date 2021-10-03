from insights import get_best_cluster, get_cluster_insights, get_customer_ids
from summery import get_summary
from botocore.parsers import BaseXMLResponseParser
from pandas.core.frame import DataFrame
from flask import Flask, render_template, url_for, request,jsonify


app = Flask(__name__)

attribute = 'balance'

balances_c0 = get_summary(0, attribute)
balances_c1 = get_summary(1, attribute)
balances_c2 = get_summary(4, attribute)
balances_c3 = get_summary(6, attribute)
balances_c4 = get_summary(7, attribute)


@app.route('/')
def homePage():
    return render_template('pieChart.html',
                           x_values=list(balances_c0['x_values']),
                           y_values_c0=list(balances_c0['y_values']),
                           y_values_c1=list(balances_c1['y_values']),
                           y_values_c2=list(balances_c2['y_values']),
                           y_values_c3=list(balances_c3['y_values']),
                           y_values_c4=list(balances_c4['y_values']),
                           attribute=attribute
                           )


@app.route('/', methods=['POST'])
def get_attribute():
    print('called')
    attribute_selected = request.form['selected_attribute']
    print(attribute_selected)
    balances_c0 = get_summary(0, attribute_selected)
    balances_c1 = get_summary(1, attribute_selected)
    balances_c2 = get_summary(4, attribute_selected)
    balances_c3 = get_summary(6, attribute_selected)
    balances_c4 = get_summary(7, attribute_selected)

    return render_template('pieChart.html',
                       x_values=list(balances_c0['x_values']),
                       y_values_c0=list(balances_c0['y_values']),
                       y_values_c1=list(balances_c1['y_values']),
                       y_values_c2=list(balances_c2['y_values']),
                       y_values_c3=list(balances_c3['y_values']),
                       y_values_c4=list(balances_c4['y_values']),
                       attribute=attribute_selected
                       )

@app.route('/insights')
def load_insights():
    return render_template('insights.html')




best_cluster=""

@app.route('/insights', methods=['POST'])
def handle_data():
    print('Inside Handle Data')
    action_selected = request.form['selected_action']
    price = request.form['price']
    is_allow = request.form.get('allowInstallments')
    if is_allow=='None':
        is_allow="No"
    else:
        is_allow="Yes"

    best_cluster = get_best_cluster(action_selected,price,is_allow)
    print('Best Cluster',best_cluster)

    #call a method to get the customer_Ids of the best cluster 
    get_customer_ids(best_cluster)

    return render_template('insights.html',
                            best_cluster=best_cluster,
                            )

@app.route("/your/webservice")
def my_webservice():
    c = request.args.get('cluster')
    print('Best Cluster is '+c)
    return jsonify(result=get_cluster_insights(c))

if __name__ == 'main':
    app.run(debug=True)
