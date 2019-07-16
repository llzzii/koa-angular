module.exports = {
  err(err, data) {
    return {
      msg: err,
      isok: false,
      data: data
    }
  },

  suc(suc, data) {
    return {
      msg: suc,
      isok: true,
      data: data
    }
  },
  getQuary(name, params) {

    if (params == null || params == "" || params.indexOf(name) == -1) {
      return;
    }
    let arr = params.split("&");
    let targetValues = arr.filter(function (e) {
      return e.split("=").includes(name);
    });
    let targetValue = targetValues[0].split("=")[1];
    return targetValue;
  },
  // 分页返回信息
  paging(dataList, totalRows) {
    return {
      dataList,
      totalRows: totalRows[0].n
    }
  }

}
