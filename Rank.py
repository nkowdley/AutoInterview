import sys
import StringIO
class Rank:
    skills = []
    gpa = 0.0
    graduation = 'Undergrad'
    #topTierCompanies = []

    def __init__(self, arrayOfStrings):
        self.arrayOfStrings = arrayOfStrings

    def enterDiscrimination(self):
        listOfSkills = raw_input('Enter the skills your require: ')
        global skills
        skills = listOfSkills.split(' ')
        for word in skills:
            print word
            print "---------------------------------------------------------------------"

        gpa = input('Enter the min GPA ')

        #graudation = input('Enter the gradation year your looking for ')
        #graduation = graduation - datetime.now().year

    def rankThePerson(self, arrayOfStrings):
        #self.rankGPA(arrayOfStrings)
        self.rankSkills(arrayOfStrings)

    def rankSkills(self, arrayOfStrings):
        global skills
        for word in skills:
            num =len(arrayOfStrings) - 1
            index = 0
            #print word
            #print "---------------------------------------------------------------------"
            while True:
                    #if arrayOfStrings[index] in word:
                    #print words + '       '    + word
                    #print "---------------------------------------------------------------------"
                    #if arrayOfStrings[index].find(word, len(arrayOfStrings[index])) == True:
                        #    array = arrayOfStrings[index + 1].split('\n')
                        #       if float(array[0]) <= 4.00:
                        #        print(array[0])

                    #    print(arrayOfStrings[index])
                if index == num:
                    #print('elif')
                    break
                else:
                    array = arrayOfStrings[index ].split('\n')
                    i = 0
                    bool = True
                    while(bool == True):
                        if i == len(array):
                            bool = False
                        elif(word in array[i]):
                            #print(array[i])
                            #print(index)
                            #print "---------------------------------------------------------------------"
                            bool = False
                        else:
                            i+=1
                    index = index + 1
                    '''for words in array:
                        if word in words:
                            #print('Break')
                            print(words)
                            print(index)
                            print "---------------------------------------------------------------------"
                            break
                    index = index + 1'''



    def rankGPA(self, arrayOfStrings):
        index = 0
        while True:
            if arrayOfStrings[index] == "GPA:":
                array = arrayOfStrings[index + 1].split('\n')
                if float(array[0]) <= 4.00:
                    print(array[0])
                    print('Break')
                    break
            index = index + 1
