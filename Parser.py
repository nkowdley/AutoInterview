from sys import argv

script, filename = argv
fileText = open(filename)  #reading in the file

print fileText.read()       #printing first line
