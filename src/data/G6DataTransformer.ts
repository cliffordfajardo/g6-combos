import { cloneDeep } from 'lodash';

export type Server = {
  id: string;
  label:string;
}
export type Cluster = {
  id:string;
  comboId:string;
  servers: Server[]
}
export type DataCenter = {
  id: string;
  comboId: string;
  clusters: Cluster[]
}

export type GraphData = {
  dataCenters: DataCenter[]
}

/*
graphData = {
  dataCenters: [
    {
      id: "dataCenterLCA1",
      comboId: "dataCenterLCA1",

      clusters: [
        {
          id: "LCA1_ClusterNode__lca1-c01.corp.com",
          comboId: "LCA1_ltx1ClusterNode__lca1-c01.corp.com",
          servers: [
            {
              id: "lca1-app31871.corp.com",
              label: "lca1-app31871.corp.com",
            },
          ],
        },
      ],
    },
  ]

STEPS
0. create nodes array
1. Grab 'datacenters` property
    - iterate over each DC item
      - create a combo out of the data center
        - grab the `id` (name)
        - set the `id`, `label` & `comboId` with value
      - push combo (data center) to nodes array

        check & `clusters` array
          - create a combo out of the cluster
            - grab the `id` (name)
            - set the `id`, `label` & `comboId` with value
            - set `parentId` to parent comboId
          - push combo(cluster) to nodes array

            check & `servers` array
              - create a node out of the cluster
                - grab the `id` (name)
                - set the `id`, `label` & `comboId` with value
                - sent the comboId to the parent value
*/
type Node = {id:string; label:string, comboId?:string}
type Edge = {id:string; label:string}
type Combo = {id:string; label:string, parentId?:string | null}

export const G6DataTransformer = (APIData:GraphData) => {
  const apiData = cloneDeep(APIData);
  const nodes:Node[] = []
  const edges:Edge[] = []
  const combos:Combo[] = []

  // Part 1: Iterate over the data centers
  const datacenters = apiData.dataCenters;
  for(const dataCenter of datacenters){
    const dataCenterComboNode: Combo = {
      id: dataCenter.id,
      label: dataCenter.id,
      parentId: null,
    }
    combos.push(dataCenterComboNode)
    
    // Part 2: Iterate over the data center's clusters
    const clusters = dataCenter.clusters;
    for(const cluster of clusters){
      const clusterComboNode: Combo = {
        id: cluster.id,
        label: cluster.id,
        parentId: dataCenter.id,
      }
      combos.push(clusterComboNode)

      const servers = cluster.servers;
      for(const server of servers){
        const node:Node = {
          id: server.id,
          label: server.id,
          comboId: cluster.id
        }
        nodes.push(node);
      }
    }
  }

  return {
    nodes,
    edges,
    combos
  }

}
