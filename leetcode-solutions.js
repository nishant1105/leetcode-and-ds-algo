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
// Make sure the numbers are represented in the linked list as reversed (123 => 3->2->1)
// If not, use the helped method to reverse the linked lists
var addTwoNumbers = function (l1, l2) {
    var reverseListHelper = function (list) {
        let node = list, prev, tmp;
        while (node) {
            tmp = node.next;
            node.next = prev;
            prev = node;
            node = tmp;
        }
        return prev;
    };
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

// 3. Longest substring without repeating characters
var lengthOfLongestSubstring = function (s) {
    var charMap = new Map();
    var ret = 0, i = 0, j = 0;
    while (i < s.length && j < s.length) {
        if (!charMap.has(s.charAt(j))) {
            charMap.set(s.charAt(j++));
            ret = Math.max(ret, j - i);
        } else {
            charMap.delete(s.charAt(i++));
        }
    }
    return ret;
};

// 110. Is Binary Tree balanced
var isBalanced = function (root) {
    var ret = true;
    var dfsHelper = function (node) {
        if (!node) return 0;
        const leftH = dfsHelper(node.left);
        const rightH = dfsHelper(node.right);
        if (Math.abs(leftH - rightH) > 1) {
            ret = false;
        }
        return 1 + Math.max(leftH, rightH);
    };
    dfsHelper(root);
    return ret;
};

// 70. Climbing Stairs (Like fibonacci sequence)
var climbStairs = function (n) {
    if (n < 4) return n;
    let f = 2, s = 3;
    for (let i = 4; i < n; i++) {
        s = f + s;
        f = s - f;
    }
    return f + s;
};

// 46. Permutations: Use Set to track results. Set can be used because nums are all distinct
var permute = function (nums) {
    var helper = function (arr, permutations, cache) {
        if (arr.length === cache.size) {
            permutations.push([...cache]);
            return;
        }
        for (let num of arr) {
            if (cache.has(num)) continue;
            cache.add(num);
            helper(arr, permutations, cache);
            cache.delete(num);
        }
    };
    var permutations = [];
    var cache = new Set();
    helper(nums, permutations, cache);
    return permutations;
};

// 78. Subsets: DFS
var subsets = function (nums) {
    var ret = [];
    var helper = function (arr, start) {
        ret.push(arr);
        for (let i = start; i < nums.length; i++) {
            helper(arr.concat(nums[i]), i + 1);
        }
    };
    helper([], 0);
    return ret;
};

// 4. Median of 2 sorted arrays

// 5. Longest palindromic substring
