/*
* Adjacency graph implementation
*
* Author: Sam Stonehouse
* Version 0.0.1 | 2013-10-15
*
* Created 2013-10-15
*
* NOT FULLY TESTED
*/

var AjacencyMatrix = (function() {
	"use strict";

	/*
	* Ajacency Matrix Constructor
	* 
	* @params Obj[] - array of initial nodes
	*/
	var AjacencyMatrix = function(nodes) {
		this.nodes = nodes;
		this.edges = [];

		//Initialise graph
		for (var i = 0; i < nodes.length; i++) {
			this.edges[nodes[i]] = [];
			for (var j = 0; j < nodes.length; j++) {
				this.edges[nodes[i]][nodes[j]] = 0;
			}
		}
	};

	/*
	* Adds a new node to the graph
	*
	* @params Obj - new node to be added to graph
	*/
	AjacencyMatrix.prototype.addNode = function(node) {
		this.nodes.push(node);
		this.edges[node] = [];

		var i;

		//Initialise new column
		for (i = 0; i < this.nodes.length; i++) {
			this.edges[this.nodes[this.nodes.length - 1]][this.nodes[i]] = 0;
		}

		//Initialise new row
		for (i = 0; i < this.nodes.length - 1; i++) {
			this.edges[this.nodes[i]][this.nodes[this.nodes.length -1]] = 0;
		}
	};

	/*
	* Adds a new edge to the graph
	*
	* @param Obj - starting node
	* @param Obj - ending node
	* @param Obj - weight for edge (optional, default = 1);
	* @param Boolean - whether the edge is directional, if not the edge 
	*		nodeB -> nodeA will also be added to the graph (optional, default = true);
	*/
	AdjacencyMatrix.prototype.add = function(nodeA, nodeB, value, directional) {
		value = (typeof(value) === 'undefined') ? 1 : value;
		directional = (typeof(directional) === 'undefined') ? true : directional;

		this.edges[nodeA][nodeB] =  value;
		this.edges[nodeB][nodeA] = directional ? this.edges[nodeB][nodeA] : this.edges[nodeA][nodeB];
	};

	/*
	* Removes an edge from the graph
	*
	* @param Obj - starting node
	* @param Obj - ending node
	* @param Boolean - whether the edge is directional, if false the edge 
	*		nodeB -> nodeA will also be removed from the graph (optional, default = true);
	*/
	AdjacencyMatrix.prototype.delete = function(nodeA, nodeB, directional) {
		directional = (typeof(directional) === 'undefined') ? true : directional;

		this.edges[nodeA][nodeB] = this.edges[nodeB][nodeA] = 0;
		this.edges[nodeB][nodeA] = directional ? this.edges[nodeB][nodeA] : 0;
	};

	/*
	* Returns true if two nodes are connected
	*
	* @param Obj - starting node
	* @param Obj - ending node
	*
	* @return Boolean - whether nodes are ajacent
	*/
	AdjacencyMatrix.prototype.ajacent = function(nodeA, nodeB) {
		return (this.edges[nodeA][nodeB] !== 0);
	};

	/*
	* Returns an array of nodes which are directly connected to the node
	*
	* @param Obj - Node in question
	*
	* @return Obj[] - array of neighbour nodes
	*/
	AdjacencyMatrix.prototype.neighbours = function(node) {
		var neighbours = [];

		for (var i = 0; i < this.nodes.length; i++) {
			if (this.edges[node][this.nodes[i]] !== 0) {
				neighbours.push(this.nodes[i]);
			}
		}

		return neighbours;
	};

	/*
	* Returns the value of the given node (not sure if really necessary but ah well)
	*
	* @param Obj - Node in question
	*
	* @return Obj - value of node;
	*/
	AdjacencyMatrix.prototype.getNodeValue = function(node) {
		return node.value;
	};

	/*
	* Sets the value of a given node (again, not really necessary but here for completeness)
	*
	* @param - node
	* @param - new value
	*/
	AdjacencyMatrix.prototype.setNodeValue = function(node, value) {
		node.value = value; //Possibly completely unecessary but nevermind
	};

	/*
	* Returns the value of an edge between two nodes
	*
	* @param nodeA - starting node
	* @param nodeB - ending node
	*
	* @return value of edge between two nodes
	*/
	AdjacencyMatrix.prototype.getEdgeValue = function(nodeA, nodeB) {
		return this.edges[nodeA][nodeB];
	};

	/*
	* Sets the edge value between two nodes (can be used as a substitue for add)
	*
	* @param nodeA - starting node
	* @param nodeB - ending node
	* @param value - new value
	*/
	AdjacencyMatrix.prototype.setEdgeValue = function(nodeA, nodeB, value) {
		this.edges[nodeA][nodeB] = value;
	};

	return AjacencyMatrix;
})();

var GNode = (function() {
	"use strict";
	/* 
	* Node wrapper for graph 
	*/
	var GNode = function(value) {
		this.value = value;
	};

	GNode.prototype.setValue = function(value) {
		this.value = value;
	};
})();

