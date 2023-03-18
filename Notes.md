## runtime complexity
worst case runtime is O(n*m)
(n) total number of passengers
(m) number of all seats

that is because for every passenger we want to assign to a seat, we should search the whole plane array till we find an empty seat for him.

## space complexity
space required is O(m), the total number of seats
(m) = (l*r*c)
(l) input array length
(r) number of rows for a block
(c) number of columns for a block
ex: if the input array is [[2, 4]], so
    m: 2*4= 8 seats total
    l: 1, since there is only one block
    r: 2, number of rows into that block
    c: 4, number of columns into that block

## Please Note:
1- if the input array contains a block like this [4, 3],
I assumed that:
    (4) is the nubmer of rows of that block
    (3) is the nubmer of columns of that block

2- I could have wrapped these functions into a class, but i thought that will not make
difference since javascript is a prototype based language anyway.