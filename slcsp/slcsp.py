import math, csv, os

def getRateArea(zipcode):
    rowdata = []
    with open('zips.csv', 'r') as f:
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            if zipcode == row[0]:
                rowdata.append(row)
        state = [sub_list[1] for sub_list in rowdata]
        rate_area = [sub_list[4] for sub_list in rowdata]
        # If there are multiple counties, check to see if the rate areas are the same
        if rate_area[1:] == rate_area[:-1]:
            if state[1:] == state[:-1]:
                # If the values of the list are the same, set the variable to the first value
                state = state[0]
                rate_area = rate_area[0]
                slcsp = getRate(state, rate_area)
                return slcsp
        else:
            # If there are multiple counties with different rate areas, answer is ambiguous
            return ''

def getRate(state, rate_area):
    plandata = []
    silverplans = []
    with open('plans.csv', 'r') as f:
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            if state == row[1] and rate_area == row[4] and row[2] == 'Silver':
                rate = row[3]
                plandata.append(rate)
                silverplans = list(set(plandata))
                silverplans.sort()
        if len(silverplans) != 0:
            slcsp = silverplans[1]
            return slcsp

def main():
    with open('slcsp.csv', 'r') as fin, open('new_slcsp.csv', 'w') as fout:
        reader = csv.reader(fin, delimiter=',')
        writer = csv.writer(fout)
        for row in reader:
            zipcode = row[0].strip()
            if row[1] == 'rate':
                writer.writerow([zipcode] + ['rate'])
            else:
                slcsp = getRateArea(zipcode)
                writer.writerow([zipcode]+[slcsp])
    os.rename('new_slcsp.csv', 'slcsp.csv')

if __name__ == '__main__':
    main()
