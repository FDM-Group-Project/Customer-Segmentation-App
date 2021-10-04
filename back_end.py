import pandas as pd
import boto3;
from botocore.config import Config

#required parameters to connect to s3 
my_config = Config(
    region_name = 'us-east-1'
)
client1 = boto3.client(
    's3',
    config=my_config,
    aws_access_key_id='AKIAXTEHORJDXDOLVSPS',
    aws_secret_access_key='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'
)
#method to connect to s3 and read the csv file
def read_csv_file():
    bucket = "handwrittenresponss3"
    file_name = "clustered_customers_new.csv"

    s3 = client1
    obj = s3.get_object(Bucket= bucket, Key= file_name) 
    initial_df = pd.read_csv(obj['Body'])
    
    return initial_df


def read_cluster_analyze_csv():
    bucket = "handwrittenresponss3"
    file_name = "analysis.csv"

    s3 = client1
    obj = s3.get_object(Bucket= bucket, Key= file_name) 
    dataFrame = pd.read_csv(obj['Body'])
    
    return dataFrame

def download_customer_ids(cluster):
    return ""
