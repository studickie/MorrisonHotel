// track drag direction
// create new element, next in line for scroll in either direction
// delete element that is more than 2 scrolls away
function SideScrollList($list) {
    var ctrl = this;

    //~ Expects:
    //~     $list: array; list of elements to be scrolled
    //~ --------------------------------------------------

    ctrl._list = $list;
}

SideScrollList.prototype = {

}