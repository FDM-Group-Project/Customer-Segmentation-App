from flask import json
from back_end import read_cluster_analyze_csv, read_csv_file
import pandas as pd
import numpy as np


cluster_summary = read_cluster_analyze_csv()
clustered_customers = read_csv_file()


def categorize_price(price):
    price_tag = ""
    price = float(price)
    if price <= 1000:
        price_tag = "low"
    elif price < 3000:
        price_tag = "medium"
    elif price >= 3000:
        price_tag = "high"
    return price_tag


def get_best_cluster(action, price, installments="Yes"):
    print("Method called")
    if(installments == 'on'):
        installments = "Yes"
    else:
        installments = "No"
    priceTag = categorize_price(price)
    print(action, priceTag, installments)
    ddf = cluster_summary.loc[(cluster_summary['Price_Range'] == priceTag) & (
        cluster_summary['Action'] == action) & (cluster_summary['Allow_Installments'] == installments)]
    cluster = ddf['Best_cluster'].values[0]

    return cluster


def get_customer_ids(cluster):
    clustered_customers_ids = clustered_customers.loc[(
        clustered_customers['cluster'] == cluster)]
    return_df = clustered_customers_ids['ID']
    return return_df


def get_summary_data(data_frame):
    summary_dic = dict()
    return_df = pd.DataFrame()
    number_of_customers = len(data_frame)
    summary_dic['number_of_customers'] = number_of_customers

    frequent_buyers = data_frame.loc[(data_frame['purchases_frequency'] > 0.9)]
    summary_dic['frequent_buyers'] = len(frequent_buyers)

    highly_prefer_installments = frequent_buyers.loc[(
        frequent_buyers['purchases_installments_frequency'] > 0.9)]
    summary_dic['highly_prefer_installments'] = len(highly_prefer_installments)

    highly_prefer_one_off = frequent_buyers.loc[(
        frequent_buyers['oneoff_purchases_frequency'] > 0.9)]
    summary_dic['highly_prefer_one_off'] = len(highly_prefer_one_off)

    return summary_dic


def get_cluster_insights(cluster):
    cluster = int(cluster)
    cluster_data_frame = clustered_customers.loc[(
        clustered_customers['cluster'] == cluster)]
    return_df = get_summary_data(cluster_data_frame)
    return return_df
