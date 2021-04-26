
interface Point {
    x: number,
    y: number
}
 const  search = () => {
    // 记录每个格子走到的最小步数
    const temp: Array<Array<number>> = new Array(n.GameData.row)
    // 初始化每个格子的步数记录为最大数值
    for(let i = 0;i < n.GameData.row;++i) {
        temp[i] = new Array<number>(n.GameData.col)
        for(let j = 0;j < n.GameData.col;++j) {
            temp[i][j] = Number.MAX_VALUE
        }
    }
    // 获取第一步可走的位置
    const firstStepList = this.getFirstStep()
    const list: Array<RunPath> = new Array<RunPath>()
    // 存放到路径列表中
    firstStepList.forEach(item=> {
        temp[item.x][item.y] = 1
        list.push(item.copy())
    })
    // 记录最少步数，初始化为最大数值
    let minStep = Number.MAX_VALUE
    // 存放路径集合
    let result: Point[] = new Array<Point>()
    while(list.length) {
        const current: RunPath = list.shift()
        // 猫到达边界
        if (current.x === 0 || current.y === 0 || current.x === n.GameData.row - 1 || current.y === n.GameData.col - 1) {
            if (current.step < minStep) { // 如果当前步数少于最少步数，那么把之前记录的路径集合清掉，保存当前记录
                result = new Array<Point>()
                result.push(current.firstStep.copy())
                minStep = current.step
            } else if (current.step === minStep) { // 如果相等，那么添加进路径集合
                result.push(current.firstStep.copy())
            }
            continue
        }
        // 获取当前位置的可走方向（因为单双行缩进不一样导致数组下标不一样，所以需要根据行数获取可走方向）
        const dir = this.getDir(current.x)
        for(let i = 0;i < dir.length;++i) {
            const t: RunPath = new RunPath(current.x, current.y)
            t.x += dir[i][0]
            t.y += dir[i][1]
            t.step = current.step + 1
            // 越界
            if (t.x < 0 || t.y < 0 || t.x === n.GameData.row || t.y === n.GameData.col) {
                continue
            }
            // 有猫或有障碍物
            if (n.GameData.gridNodeList[t.x][t.y].getStatus() !== GridNodeStatus.AVAILABLE) {
                continue
            }
            if (temp[t.x][t.y] > t.step) {
                temp[t.x][t.y] = t.step
                t.firstStep = current.firstStep.copy()
                list.push(t)
            }
        }
    }
    const nextResult: SearchResult = new SearchResult()
    if (minStep === Number.MAX_VALUE) {
        // 无路可走，切换状态
        this.setStatus(CatStatus.UNAVAILABLE)
        nextResult.hasPath = false
    }
    if (result.length === 0) {
        // 没有路可以走出去，那就向四周随机走一格
        firstStepList.forEach(item=> {
            result.push(item.firstStep)
        })
    }
    if (result.length > 0) {
        const list = this.sortList(result)
        // 从所有结果中随机选一格，避免出现走固定路线
        const index = Math.floor(Math.random() * list.length)
        nextResult.nextStep = list[index]
    } else {
        // 没有路可走，那就走当前坐标（外部判断为当前坐标就知道猫走不了输了）
        nextResult.nextStep = this.index
    }
    return nextResult
}

const  sortList = (list: Array<Point>): Array<Point> => {
    const sort: Array<any> = new Array<any>()
    list.forEach(item=> {
        // key就是下一步要走的坐标
        const key = `${item.x  }-${  item.y}`
        let index = -1
        for (let i = 0;i < sort.length;++i) {
            if (sort[i].key === key) {
                index = i
                break
            }
        }
        if (index > -1) {
            // 计数
            sort[index].count++
        } else {
            sort.push({
                key,
                value: item,
                count: 1
            })
        }
    })
    // 从多到少排序，数量多的就是走这一步之后有更多的路径方向可以走
    sort.sort((a, b)=> {
        return b.count - a.count
    })
    const result: Array<Point> = new Array<Point>()

    sort.forEach(item=> {
        if (item.count === sort[0].count) {
            result.push(new Point(item.value.x, item.value.y))
        }
    })

    return result
}


const  getFirstStep = (): Array<RunPath> => {
    const firstStepList = new Array<RunPath>()

    const dir = this.getDir(this.index.x)
    for(let i = 0;i < dir.length;++i) {
        const x = this.index.x + dir[i][0]
        const y = this.index.y + dir[i][1]
        // 越界
        if (x < 0 || y < 0 || x >= n.GameData.row || y >= n.GameData.col) {
            continue
        }
        // 不可走
        if (n.GameData.gridNodeList[x][y].getStatus() !== GridNodeStatus.AVAILABLE) {
            continue
        }
        const runPath: RunPath = new RunPath(x, y)
        runPath.step = 1
        runPath.firstStep = new Point(x, y)
        firstStepList.push(runPath)
    }
    return firstStepList
}

const  getDir = (col) => {
    const t = col % 2
    const dir: number[][] = [
            [0, -1], // left
            [0, 1], // right
            [-1, t - 1], // top-left
            [-1, t * 1], // top-right
            [1, t - 1], // bottom-left
            [1, t * 1], // bottom-right
        ]
    return dir
}

export {
    getDir,
    search,
    sortList,
    getFirstStep,
}