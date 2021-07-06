// 1. Two Sum
var twoSum = function (nums, target) {
    var numMap = {}, i = 0;
    for (let num of nums) {
        let other = target - num;
        if (!numMap.hasOwnProperty(other)) {
            return [numMap[other], i];
        }
        numMap[num] = i;
        i++;
    }
    return -1;
};

// 2. Add 2 numbers
var addTwoNumbers = function (l1, l2) {
    let p1 = l1, p2 = l2;
    let headPtr = new ListNode();
    let head = headPtr;
    let carry = 0;
    while (p1 || p2) {
        let val1 = !p1 ? 0 : p1.val;
        let val2 = !p2 ? 0 : p2.val;
        let sum = val1 + val2 + carry;
        if (sum > 9) {
            carry = 1;
        } else {
            carry = 0;
        }
        headPtr.next = new ListNode(sum % 10);
        headPtr = headPtr.next;
        p1 = !p1 ? null : p1.next;
        p2 = !p2 ? null : p2.next;
    }
    if (carry > 0) {
        headPtr.next = new ListNode(carry);
    }
    return head.next;
};