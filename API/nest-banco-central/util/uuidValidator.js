/* eslint-disable prettier/prettier */
exports.isUUID = (uuid) => {
  const pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (pattern.test(uuid)){
      return true;
    } else {
      return false;
    }
};

exports.isCPF = (strCPF) => {
  const cpfMask = /^\d{11}$/;

  if (cpfMask.test(strCPF)){
    return true;
  } else {
    return false;
  }
};
