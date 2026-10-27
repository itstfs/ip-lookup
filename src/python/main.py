import socket as s

host = 'google.com' # colocar a host | # ex: google.com - github.com 
                            
Ip = s.gethostbyname(host)

print('=-'*30)
print('O \33[32mIP do Host \33[m"' + host + '" é: ' + Ip)
print('=-'*30)