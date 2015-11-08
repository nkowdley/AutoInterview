#!/Library/Frameworks/Python.framework/Versions/2.6/Resources/Python.app/Contents/MacOS/Python
from __future__ import print_function
import sys
import StringIO
import textmining
import numpy as np
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice, TagExtractor
from pdfminer.pdfpage import PDFPage
from pdfminer.converter import XMLConverter, HTMLConverter, TextConverter
from pdfminer.cmapdb import CMapDB
from pdfminer.layout import LAParams
from pdfminer.image import ImageWriter
from Rank import Rank

gpa = 0.0
skills = []
leadership = ['Led', 'Planned', 'Executed']
collab = ['team', 'member', 'club', 'team', 'collaborate']
comm = ['monitor', 'update', 'propose', 'closely']
enthu = ['team', 'hackathon', 'project', 'create']
teach = ['learn', 'investigate', 'execute']
# main
def bob(argv, value):
    import getopt
    def usage():
        print ('usage: %s [-d] [-p pagenos] [-m maxpages] [-P password] [-o output]'
               ' [-C] [-n] [-A] [-V] [-M char_margin] [-L line_margin] [-W word_margin]'
               ' [-F boxes_flow] [-Y layout_mode] [-O output_dir] [-R rotation]'
               ' [-t text|html|xml|tag] [-c codec] [-s scale]'
               ' file ...' % argv[0])
        return 100

    try:
        (opts, args) = getopt.getopt(argv[1:], 'dp:m:P:o:CnAVM:L:W:F:Y:O:R:t:c:s:')
    except getopt.GetoptError:
        return usage()
    if not args: return usage()
    # debug option
    ##################################################
    #stringToSplit = []
    pageArray = []


    ##################################################
    debug = 0
    # input option
    password = ''
    pagenos = set()
    maxpages = 0
    # output option
    outfile = None
    outtype = None
    imagewriter = None
    rotation = 0
    layoutmode = 'normal'
    codec = 'utf-8'
    pageno = 1
    scale = 1
    caching = True
    showpageno = True
    laparams = LAParams()
    for (k, v) in opts:
        if k == '-d': debug += 1
        elif k == '-p': pagenos.update( int(x)-1 for x in v.split(',') )
        elif k == '-m': maxpages = int(v)
        elif k == '-P': password = v
        elif k == '-o': outfile = v
        elif k == '-C': caching = False
        elif k == '-n': laparams = None
        elif k == '-A': laparams.all_texts = True
        elif k == '-V': laparams.detect_vertical = True
        elif k == '-M': laparams.char_margin = float(v)
        elif k == '-L': laparams.line_margin = float(v)
        elif k == '-W': laparams.word_margin = float(v)
        elif k == '-F': laparams.boxes_flow = float(v)
        elif k == '-Y': layoutmode = v
        elif k == '-O': imagewriter = ImageWriter(v)
        elif k == '-R': rotation = int(v)
        elif k == '-t': outtype = v
        elif k == '-c': codec = v
        elif k == '-s': scale = float(v)
    #
    PDFDocument.debug = debug
    PDFParser.debug = debug
    CMapDB.debug = debug
    PDFResourceManager.debug = debug
    PDFPageInterpreter.debug = debug
    PDFDevice.debug = debug
    #
    rsrcmgr = PDFResourceManager(caching=caching)

    if not outtype:
        outtype = 'text'
        if outfile:
            if outfile.endswith('.htm') or outfile.endswith('.html'):
                outtype = 'html'
            elif outfile.endswith('.xml'):
                outtype = 'xml'
            elif outfile.endswith('.tag'):
                outtype = 'tag'
    if outfile:
        outfp = file(outfile, 'w')
    else:
        outfp = StringIO.StringIO()
    if outtype == 'text':
        device = TextConverter(rsrcmgr, outfp, codec=codec, laparams=laparams,
                               imagewriter=imagewriter)
    elif outtype == 'xml':
        device = XMLConverter(rsrcmgr, outfp, codec=codec, laparams=laparams,
                              imagewriter=imagewriter)
    elif outtype == 'html':
        device = HTMLConverter(rsrcmgr, outfp, codec=codec, scale=scale,
                               layoutmode=layoutmode, laparams=laparams,
                               imagewriter=imagewriter)
    elif outtype == 'tag':
        device = TagExtractor(rsrcmgr, outfp, codec=codec)
    else:
        return usage()
    #for fname in args:
    for x in range (1,2):
        fp = file(argv[x], 'rb')
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        print('____________________________Start TEST #1 ___________________________')
        for page in PDFPage.get_pages(fp, pagenos,
                                      maxpages=maxpages, password=password,
                                      caching=caching, check_extractable=True):
            page.rotate = (page.rotate+rotation) % 360
            #interpreter.process_page(page)
            interpreter.process_page(page)
            value = outfp.getvalue()
            #    pass
            #    sys.stdout.write(interpreter.process_page(page))
            #pageArray[0] = interpreter.process_page(page)
        print('____________________________End TEST #1 ___________________________')
        fp.close()
    device.close()
    outfp.close()
    return value

def makeTable(string):
    #print string
    #line3 = 'Collaborated closely with Software and Human Factors Engineers in order to formulate test cases and verify the correct procedures for test cases.'

    print("Text: ")
    for n, doc in enumerate([string, ""]):
        print("document {}: {}".format(n+1, doc))

    print("-----------------------------------------------------------")


    titles = ("leader, collaborated, led, Team")

    print("Discriminations: ")
    for n, title in enumerate(titles):
        print("title {}: {}".format(n+1, title))

    print("-----------------------------------------------------------")



    tdm = textmining.TermDocumentMatrix()

    tdm.add_doc(string)


    temp = list(tdm.rows(cutoff=1))

    vocab = tuple(temp[0])

    Values = np.array(temp[1:])


    tdm.write_csv('matrix.csv', cutoff=1)
    print("shape: {}".format(Values.shape))
    print('--------------------------------------------------------------------')
    listOfVocab = list(vocab)
    length = len(listOfVocab)
    Values.tolist()
    listOfVal = list(Values.tolist()[0])
    print(len(listOfVal))
    print(len(listOfVocab))
    dict = {};
    for x in range(0, length):
        dict.update({str(listOfVocab[x]) :  str(listOfVal[x])})
    makeRankings(dict)

def makeRankings(dict):
    f = open("output.txt","w")
    string = 'GPA : ' + str(gpa)   #gpa
    line = f.write( string );


    leadership = ['Led', 'Planned', 'Executed']
    collab = ['team', 'member', 'club', 'team', 'collaborate']
    comm = ['monitor', 'update', 'propose', 'closely']
    enthu = ['team', 'hackathon', 'project', 'create']
    teach = ['learn', 'investigate', 'execute']
    total =0;
    zero = 0;
    numOfSkills = len(skills)
    for words in skils: #skills
        num = dict.get(words)
        if num > 0:
            total = total + zero
            zero = zero + 1
    string = 'skils : ' + str(zero)
    line = f.write( string )
    line = f.write('\n')
    zero = 0;
    #numOfLead = len(leadership)
    for words in leadership: #skills
        num = dict.get(words)
        if not num == None:
            print(num)
            total = total + zero
            zero = zero + float(num)
    string = 'leadership : ' + str(zero)
    line = f.write( string )
    line = f.write('\n')
    zero = 0;
    #numOfLead = len(collaboration)
    for words in collab: #skills
        num = dict.get(words)
        if not num == None:
            total = total + zero
            zero = zero + float(num)
    string = 'collaboration : ' + str(zero)
    line = f.write( string )
    line = f.write('\n')
    zero = 0;
    #numOfLead = len(communication)
    for words in collab: #skills
        num = dict.get(words)
        if not num == None:
            total = total + zero
            zero = zero + float(num)
    string = 'communication : ' + str(zero)
    line = f.write( string )
    line = f.write('\n')
    zero = 0;
    #numOfLead = len(enthusism)
    for words in enthu: #skills
        num = dict.get(words)
        if not num == None:
            total = total + zero
            zero = zero + float(num)
    string = 'enthusism : ' + str(zero)
    line = f.write( string )
    line = f.write('\n')
    zero = 0;
    #numOfLead = len(enthusism)
    for words in teach: #skills
        num = dict.get(words)
        if not num == None:
            total = total + zero
            zero = zero + float(num)
    string = 'teachability : ' + str(zero)
    line = f.write( string )
    line = f.write('\n')
    totalString = 'total : ' + str(total/60)
    line = f.write( totalString )
    line = f.write('\n')
    f.close


def main():
    global gpa
    global skills
    skills = sys.argv[2]

    #temp = [sys.argv[0], sys.argv[0]]
    string = ""
    value = 'Hello World'
    value = bob(sys.argv, value)
    value.strip()
    txtArray = value.split(" ")
    index = 0
    for word in txtArray:
        array = word.split('\n')
        for word2 in array:
            word2 = word2.replace(',', '')
            word2 = word2.replace('.', '')
            word2 = word2.replace(':', '')
            if array[0] == "GPA:":
                gpa = txtArray[index + 1]
            string += " " + word2
            #makeTable(string)
#            print string
#            print "---------------------------------------------------------------------"
        index = index + 1;
    makeTable(string)
    #print gpa

if __name__ == '__main__':
    print(len(sys.argv))
    print(sys.argv[0])
    print(sys.argv[1])
    main()
