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

// 716. Max Stack
var MaxStack = function () {
    this.stack = [];
    this.maxVal = -Infinity;
    this.maxInd = -1;
};
MaxStack.prototype.push = function (val) {
    this.stack.push(val);
    if (val >= this.maxVal) {
        this.maxVal = val;
        this.maxInd = this.stack.length - 1;
    }
};
MaxStack.prototype.pop = function () {
    // Is max val on top?
    let isMaxOnTop = this.maxInd === this.stack.length - 1;
    return isMaxOnTop ? this.popMax() : this.stack.pop();
};
MaxStack.prototype.top = function () {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1];
};
MaxStack.prototype.peekMax = function () {
    return this.maxVal;
};
MaxStack.prototype.popMax = function () {
    var ret = this.maxVal;
    this.stack.splice(this.maxInd, 1);
    // Update new Max
    /*this.maxVal = Math.max(...this.stack);
    this.maxInd = this.stack.indexOf(this.maxVal);*/
    this.maxVal = -Infinity;
    this.maxInd = -1;
  
    for (var i = this.stack.length - 1; i >= 0; i--) {
        if (this.maxVal < this.stack[i]) {
        this.maxVal = this.stack[i];
        this.maxInd = i;
        }
    }  
    // return poped max
    return ret;
};

// 244. Shortest Word Distance II
var WordDistance = function (wordsDict) {
    this.wordMap = {};
    for (let i = 0; i < wordsDict.length; i++) {
        if (this.wordMap.hasOwnProperty(wordsDict[i])) {
            this.wordMap[wordsDict[i]].push(i);
        } else {
            this.wordMap[wordsDict[i]] = [i];
        }
    }
};
WordDistance.prototype.shortest = function (word1, word2) {
    let indices1 = this.wordMap[word1], indices2 = this.wordMap[word2];
    let minDist = Infinity;
    for (let ind1 of indices1) {
        for (let ind2 of indices2) {
            minDist = Math.min(minDist, Math.abs(ind1 - ind2));
        }
    }
    return minDist;
};
// Test Case:
var wd = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);

// 364. Nested List Weight Sum ||
var depthSumInverse = function (nestedList) {
    var depth = [];
    var getDepthDFS = function (el, depth, level) {
        depth[level] = depth[level] || [];
        if (el.getInteger()) {
            // Element is an integer
            depth[level].push(el.getInteger())
        } else {
            // Element is an array (list)
            for (let i of el.getList()) {
                getDepthDFS(i, depth, level + 1);
            }
        }
    };
    for (let el of nestedList) {
        getDepthDFS(el, depth, 0);
    }
    let sum = 0, len = depth.length;
    for (let d of depth) {
        sum = sum + d.reduce((acc, val) => {
            return acc + (val * len);
        }, 0);
        len--;
    }
    return sum;
};

// 1086. High Five
var highFive = function (items) {
    var map = {};
    for (let [id, score] of items) {
        if (!map.hasOwnProperty(id)) {
            map[id] = [score];
        } else {
            // Here multiple sorts are technicaly constant time because they are only 5 elements at max
            let currScores = map[id];
            if (currScores.length < 5) {
                currScores.push(score);
                currScores.sort((a, b) => a - b);
            } else {
                if (currScores[0] < score) {
                    currScores[0] = score;
                    currScores.sort((a, b) => a - b);
                }
            }
            map[id] = currScores;
        }
    }
    var ret = [];
    for (let id in map) {
        let currScores = map[id];
        let currSum = currScores.reduce((ac, val) => ac + val, 0);
        ret.push([id, Math.floor(currSum / 5)]);
    }
    return ret;
};

// 545. Boundary of a binary tree (Use DFS)
var boundaryOfBinaryTree = function (root) {
    var ret = [];
    if (!root) return ret;
    ret.push(root.val);
    var dfsHelper = function (node, hasLeft, hasRight) {
        if (!node) return;
        if (!node.left && !node.right) {
            ret.push(node.val);
            return;
        }
        if (hasLeft) {
            ret.push(node.val);
        }
        // Left subtree from node
        dfsHelper(node.left, hasLeft, hasRight && !node.right);
        // Right subtree from node
        dfsHelper(node.right, hasLeft && !node.left, hasRight);
        if (hasRight) {
            ret.push(node.val);
        }
    };
    // Left subtree from root
    dfsHelper(root.left, true, false);
    // Right subtree from root
    dfsHelper(root.right, false, true);
    return ret;
};

// 366. Find Leaves of Binary Tree
var findLeaves = function (root) {
    var ret = [];
    if (!root) return ret;
    var dfsHelper = function (node, res) {
        if (!node) return null;
        if (!node.left && !node.right) {
            res.push(node.val);
            return null;
        }
        node.left = dfsHelper(node.left, res);
        node.right = dfsHelper(node.right, res);
        return node;
    };
    while (root) {
        const leafs = [];
        root = dfsHelper(root, leafs);
        ret.push(leafs);
        if (!root) break;
    }
    return ret;
};

// 616. Add Bold Tag in String
var addBoldTag = function (s, words) {
    var boldIndices = new Array(s.length).fill(false);
    for (let word of words) {
        let start = s.indexOf(word);
        while (start > -1) {
            let end = start + word.length;
            for (let i = start; i < end; i++) {
                if (boldIndices[i]) continue;
                boldIndices[i] = true;
            }
            start = s.indexOf(word, start + 1);
        }
    }
    let ret = "";
    for (let i = 0; i < s.length; i++) {
        if (boldIndices[i] && (i === 0 || !boldIndices[i - 1])) {
            // Start bold tag if boldIndex is true and previous bolsIndex was false
            ret = ret + '<b>';
        }
        ret = ret + s[i];
        if (boldIndices[i] && (i === s.length || !boldIndices[i + 1])) {
            // End bold tag if string is finished
            ret = ret + '</b>';
        }
    }
    return ret;
};

// 340. Longest Substring with At Most K Distince characters
var lengthOfLongestSubstringKDistinct = function (s, k) {
    var len = s.length;
    var map = new Map();
    let l = 0, maxLen = 0;
    for (let i = 0; i < len; i ++) {
        let c1 = s.charAt(i);
        if (!map.has(c1)) map.set(c1, 0);
        map.set(c1, map.get(c1) + 1);
        while (map.size > k) {
            let c2 = s.charAt(l);
            map.set(c2, map.get(c2) - 1);
            if (map.get(c2) === 0) map.delete(c2);
            l++;
        }
        maxLen = Math.max(maxLen, i - l + 1);
    }
    return maxLen;
};

// 259. 3Sum Smaller
var threeSumSmaller = function (arr, target) {
    let res = 0, len = arr.length;
    arr = arr.sort((a, b) => a - b);
    for (let i = 0; i < len; i++) {
        let l = i + 1, r = len - 1;
        while (l < r) {
            let currSum = arr[i] + arr[l] + arr[r];
            if (currSum < target) {
                /* 
                Because the array is sorted, once we find a combination that is less than our target, 
                ALL numbers between left and right ARE ALSO combinations less than our target. 
                Instead of iterating through them just subtract left from right to get the correct count 
                */
                res = res + (r - l);
                l++;
            } else {
                r--;
            }
        }
    }
    return res;
};

// 362. Design Hit Counter
var HitCounter = function () {
    this.hits = [];
};
HitCounter.prototype.hit = function (timestamp) {
    this.hits.push(timestamp);
};
HitCounter.prototype.getHits = function (timestamp) {
    while (this.hits.length > 0 && timestamp - this.hits[0] >= 300) {
        this.hits.shift();
    }
    return this.hits.length;
};
