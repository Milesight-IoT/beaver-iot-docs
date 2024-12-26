---
sidebar_position: 3
---

import { ProjectName } from '/src/consts';

# 添加集成
启动Docker容器后, 会在执行命令的路径下创建一个名为`beaver-iot`的目录, 该目录用于存储{ProjectName}的持久化数据, 例如数据库和日志.

如果需要为{ProjectName}安装集成, 请在该目录下创建一个名为`integrations`的文件夹, 并将`.jar`后缀的集成文件放入其中, 然后执行命令 `docker restart beaver-iot` 重启服务使之生效.

<!-- 您可以从[这里](https://drive.weixin.qq.com/s?k=AMgAYAe8AAYhvgqr6K)获取集成示例. -->
