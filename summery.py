from back_end import read_csv_file
import pandas as pd
import numpy as np

clustered_customers = read_csv_file()

def get_summary(cluster_number,attribute):

  cluster = clustered_customers.loc[clustered_customers['cluster'] == cluster_number]

  cols_large = ['balance', 'purchases', 'oneoff_purchases','cash_advance',
         'credit_limit', 'payments','installments_purchases']

  cols_small = ['balance_freq', 'purchases_frequency', 'oneoff_purchases_frequency','purchases_installments_frequency',
         'cash_advance_frequency']

  cols_trx = ['CASH_ADVANCE_TRX', 'PURCHASES_TRX']
  if(attribute  in cols_large):
    bin=[0,500,1000,3000,5000,10000,15000,20000]

  elif(attribute in cols_small):
    bin = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
  elif(attribute in cols_trx):
    bin =[0,20,40,60,80,100,150]


  #creating categories/ranges
  qs = pd.cut(cluster[attribute], bins=bin ) #for cluster 1
  values = np.array(qs.value_counts())
  #print(qs.value_counts())

  #------------ Generating x-labels - ---------------
  x_labels  = []
  label=""
  for i in range(1,len(bin)):
    label=str(bin[i-1])+" - "+str(bin[i])
    x_labels.append(label)

  x_labels = np.array(x_labels)


  #----------- Generating Y values ------------
  y_values = np.array(qs.value_counts())
  
  return_df = pd.DataFrame({'x_values':x_labels,
                          'y_values':y_values
                          })
  return return_df

 