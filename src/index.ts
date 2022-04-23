import { ZktecoService } from "./zkteco.service";

const zk = new ZktecoService("192.168.100.201");

zk.getUsers().then((res) => console.log(res.total));
