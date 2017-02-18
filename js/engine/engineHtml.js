function engineHtml()
{
	//leer un archivo html, esto puede dar errores en caso de que hayan sintaxis inválidas
	//como la de  anidar una etiqueta <div> dentro de una etiqueta <p>
	this.readTemplate=function()
	{
		var template={};
		//lee y guarda un nodo en caso de que no exista
		var readNode=function(node,position,level,complete)
		{
			complete=false;
			if(!template[pos])
			{
				//se crea la posicion pos
				template[pos]={};
				//nombre de la etiqueta
				template[pos]['tag']=node.tagName;
				//nivel completo de la descendencia
				template[pos]['level']=position;
				//nivel en la descendencia padre es 1, hijo 2, nietos 3, ettc
				template[pos]['hierarchy']=level;
				console.log("position "+position);
				
				if(complete===true)
				{
					//texto de la etiqueta
					template[pos]['tagText']=node.textContent;
					//leer los atributos en caso de que tenga y omitiendo el atributos style
					template[pos]['attributes']=node.attributes;
					//comentarios en caso que sea tipo comentario, deberia ser un arreglo
					template[pos]['comments']=node.comments
					//documentacion se llenara despues
					template[pos]['documentation']="";
					//lista rapida de los estilos que afectan a la etiqueta
					template[pos]['overview']="";					
					//atributo name, pensar si eliminar
					template[pos]['name']="";
					//version de la etiqueta
					template[pos]['version']="";
				}//fin if complete===true				
				
			}//fin if(!template[pos])
		}//fin nodeRead=function(node,position,level,complete)
		
		
		//declarar e inicializar el arreglo que cumplirá de auxiliar
		var nivel={};
		//function que asignará valores a nivel
		var declararInicializar=function (nod,pos,lev)
		{
			//nod= es el nodo | pos=la posicion | lev= el level(nivel)
			if(!nivel['position'+pos])
			{
				var space="";
				for(e=1;e<=level;e++){space+=" ";}
				//console.log(nod);
				nivel['position'+pos]={};
				//readNode(node,position,level,complete);
				nivel['position'+pos]['children']=0;
				//comprobar si tiene hijos
				if(nod.children!==undefined && nod.children.length>0)
				{
					//cantidad de hijos
					var length=nod.children.length;
					nivel['position'+pos]['children']=length;
					//crear las posiciones hijos e inicializar solo si se visitarion
					for(h=0;h<length;h++)
					{
						nivel['position'+pos]['child-'+h]='unclear';
					}
				}
				//nivel en la descendencia
				nivel['position'+pos]['level']=lev;
				//id 
				nivel['position'+pos]['id']=nod.id;
			}
		}
		
		//funcion que actualiza la posicion
		var actualizarPosicion=function(pos)
		{
			//quitar los guiones a las posiciones para acceder a los números
			var tempPos=pos.split("-");
			//console.log("postion a partir "+pos);
			var posLength=tempPos.length;
			//se reinicia el valor de tempNode
			tempNode=document.body;
			
			for(p=2;p<posLength;p++)
			{
				//console.log(" vuelta "+p);
				//posicion de hijo
				var tempChild=tempPos[p];
				tempNode=tempNode.children[tempChild];
				//console.log("child "+tempChild);
			}
		}
		
		//declarar e inicializar el interruptor de while
		var loop=true;
		//declarar e inicializar el directorio inicial a leer
		var tempNode=document.body;
		//nivel en la descendencia
		var level=0;
		//auxiliar lector de número de hijo
		var child=0;
		//auxiliar lector de posicion
		var position="-0";
		//interrupto bruto
		var s=0;
		
		while(loop===true)
		{
			//++s;
			//console.log("s es "+s);
			//console.log("position es "+position);
			//funcion que guarda e inicializa el array nivel
			declararInicializar(tempNode,position,level);
			
			//variable de lectura si se consiguió un hijo unclear
			var unclear=false;
			
			//////   1   //////
			//si tiene hijos
			if(nivel['position'+position]['children']>0)
			{				
				//console.log("postion "+position+" tiene "+nivel['position'+position]['children']+" hijos");			
				//si algun hijo es unclear
				for(i=0;i<nivel['position'+position]['children'];i++)
				{					
					//si se consigue el hijo unclear
					if(nivel['position'+position]['child-'+i]==="unclear")
					{
						//se actualizan los niveles
						++level;
						position=position+"-"+i;
						actualizarPosicion(position);
						child=i;
						unclear=true;
						break;
					}
				}//fin for(i=0;i<nivel['position'+position]['children'];i++)
			}//fin de comentario titulo 1
				
			//////   2   //////
			//si no tiene un hijo unclear
			if(unclear===false)
			{
				//console.log("unclear es false o no tiene hijos");
				//si level es mayor a cero, subir un nivel, es restar a level
				if(level>0)
				{
					//console.log("level es mayor que cero");
					//nueva position
					var tempPosition=position.slice(0,-2);
					//se hace clear
					nivel['position'+tempPosition]['child-'+child]="clear";					
					//se actualizan los niveles
					--level;
					position=tempPosition;
					actualizarPosicion(position);
					child=position.slice(-2);
				}
				//si no, significa que es body y se revisaron todos los hijos por lo que se termina el ciclo
				else{loop=false;/*console.log("level no es mayor que cero y loop es false natural");*/}				
				
			}	
			
			//if(s===50){loop=false;console.log("loop false forzado");}				
			
		}//fin while(loop===true)
		
		
		
	}
	
	this.readTemplate2=function()
	{
		var template={};
		//lee y guarda un nodo en caso de que no exista
		var readNode=function(node,position,level,complete)
		{
			complete=false;
			if(!template[position])
			{
				//se crea la posicion pos
				template[position]={};
				//nombre de la etiqueta
				template[position]['tag']=node.tagName;
				//nivel completo de la descendencia
				template[position]['level']=position;
				//nivel en la descendencia padre es 1, hijo 2, nietos 3, ettc
				template[position]['hierarchy']=level;
				console.log("position "+position);
				
				if(complete===true)
				{
					//texto de la etiqueta
					template[pos]['tagText']=node.textContent;
					//leer los atributos en caso de que tenga y omitiendo el atributos style
					template[pos]['attributes']=node.attributes;
					//comentarios en caso que sea tipo comentario, deberia ser un arreglo
					template[pos]['comments']=node.comments
					//documentacion se llenara despues
					template[pos]['documentation']="";
					//lista rapida de los estilos que afectan a la etiqueta
					template[pos]['overview']="";					
					//atributo name, pensar si eliminar
					template[pos]['name']="";
					//version de la etiqueta
					template[pos]['version']="";
				}//fin if complete===true				
				
			}//fin if(!template[pos])
		}//fin nodeRead=function(node,position,level,complete)
		
		
		//declarar e inicializar el arreglo que cumplirá de auxiliar
		var nivel={};
		//function que asignará valores a nivel
		var declararInicializar=function (nod,pos,lev)
		{
			//nod= es el nodo | pos=la posicion | lev= el level(nivel)
			if(!nivel['position'+pos])
			{
				var space="";
				for(e=1;e<=level;e++){space+=" ";}
				//console.log(nod);
				nivel['position'+pos]={};
				
				//readNode(node,position,level,complete);
				readNode(nod,pos,lev,false);
				
				nivel['position'+pos]['children']=0;
				//comprobar si tiene hijos
				if(nod.children!==undefined && nod.children.length>0)
				{
					//cantidad de hijos
					var length=nod.children.length;
					nivel['position'+pos]['children']=length;
					//crear las posiciones hijos e inicializar solo si se visitarion
					for(h=0;h<length;h++)
					{
						nivel['position'+pos]['child-'+h]='unclear';
					}
				}
				//nivel en la descendencia
				nivel['position'+pos]['level']=lev;
				//id 
				nivel['position'+pos]['id']=nod.id;
			}
		}
		
		//funcion que actualiza la posicion
		var actualizarPosicion=function(pos)
		{
			//quitar los guiones a las posiciones para acceder a los números
			var tempPos=pos.split("-");
			//console.log("postion a partir "+pos);
			var posLength=tempPos.length;
			//se reinicia el valor de tempNode
			tempNode=document.body;
			
			for(p=2;p<posLength;p++)
			{
				//console.log(" vuelta "+p);
				//posicion de hijo
				var tempChild=tempPos[p];
				tempNode=tempNode.children[tempChild];
				//console.log("child "+tempChild);
			}
		}
		
		//declarar e inicializar el interruptor de while
		var loop=true;
		//declarar e inicializar el directorio inicial a leer
		var tempNode=document.body;
		//nivel en la descendencia
		var level=0;
		//auxiliar lector de número de hijo
		var child=0;
		//auxiliar lector de posicion
		var position="-0";
		//interrupto bruto
		var s=0;
		
		while(loop===true)
		{
			//++s;
			//console.log("s es "+s);
			//console.log("position es "+position);
			//funcion que guarda e inicializa el array nivel
			declararInicializar(tempNode,position,level);
			
			//variable de lectura si se consiguió un hijo unclear
			var unclear=false;
			
			//////   1   //////
			//si tiene hijos
			if(nivel['position'+position]['children']>0)
			{				
				//console.log("postion "+position+" tiene "+nivel['position'+position]['children']+" hijos");			
				//si algun hijo es unclear
				for(i=0;i<nivel['position'+position]['children'];i++)
				{					
					//si se consigue el hijo unclear
					if(nivel['position'+position]['child-'+i]==="unclear")
					{
						//se actualizan los niveles
						++level;
						position=position+"-"+i;
						actualizarPosicion(position);
						child=i;
						unclear=true;
						break;
					}
				}//fin for(i=0;i<nivel['position'+position]['children'];i++)
			}//fin de comentario titulo 1
				
			//////   2   //////
			//si no tiene un hijo unclear
			if(unclear===false)
			{
				//console.log("unclear es false o no tiene hijos");
				//si level es mayor a cero, subir un nivel, es restar a level
				if(level>0)
				{
					//console.log("level es mayor que cero");
					//nueva position
					var tempPosition=position.slice(0,-2);
					//se hace clear
					nivel['position'+tempPosition]['child-'+child]="clear";					
					//se actualizan los niveles
					--level;
					position=tempPosition;
					actualizarPosicion(position);
					child=position.slice(-2);
				}
				//si no, significa que es body y se revisaron todos los hijos por lo que se termina el ciclo
				else{loop=false;/*console.log("level no es mayor que cero y loop es false natural");*/}				
				
			}	
			
			//if(s===50){loop=false;console.log("loop false forzado");}				
			
		}//fin while(loop===true)
		
		template=JSON.stringify(template);
		//para poder ver como texto ya que si no se muestra un string=[object]
		console.log("String");
		return template;
	}
	
	
	
	
	
	this.dom=function()
	{
		//arreglos con las etiquetas, sus atributos y texto de contenido, de forma ascentedente
		//mientras que la primera etiqueta es la padre, las demas son una linea de descendencia
		//es decir [1]=> padre [2]=> hijos [3]=> nietos [4]=> bisnietos ,etc 		
		var doc={};
		
		doc[0]={};
		doc[0]['name']="nombre del template";
		doc[0]['author']="autor del template";
		doc[0]['version']="versión del template";
		doc[0]['date']="fecha de terminación de producto";
		doc[0]['contact']="arreglo con información de contacto, Ejem: {face:'www.face.com/user',email : 'a@g.com'}";
		doc[0]['documentation']="arreglo con la documentación de esta etiqueta en caso que los hubiera";
		doc[0]['comments']="en caso de que tenga comentarios a insertar en el html";
		//Cantidad de descendencia, ejemplo si solohay un hijo y un padre, levels es 2
		doc[0]['levels']=2;
		//cantidad de etiquetas
		doc[0]['nodes']=4;
		
		
		//////////////////////////////////////      1    /////////////////////////////////////
		doc[1]={};
		doc[1]['tag']="div";
		doc[1]['tagText']="este es el texto dentro de la etiqueta en caso que hubiera";
		//arreglos con los atributos en pares atributo/valor
		doc[1]['attributes']="";
		doc[1]['comments']="en caso de que tenga comentarios a insertar en el html";
		doc[1]['documentation']="arreglo con la documentación de esta etiqueta en caso que los hubiera";
		doc[1]['overview']="lista rápida de los estilosque afectan a esta etiqueta";
		doc[1]['hierarchy']="posición en la descendencia [1] es padre [2]descendencia 1 [3]descendencia 2";
		doc[1]['name']="nombre de la etiqueta en caso que tuviera";
		doc[1]['version']="versión de la etiqueta";
		//Nivel en la  descendencia, ejemplo el padre, que no es body, es 1
		doc[1]['level']={L0:1,L1:1};
		
		
		
		
		
		//////////////////////////////////////      2    /////////////////////////////////////
		doc[2]={};
		doc[2]['tag']="input";
		doc[2]['tagText']="";
		//arreglos con los atributos en pares atributo/valor
		doc[2]['attributes']={id :'algo',type:'text',placeholder:'Este es un campo de texto'};
		doc[2]['comments']="";
		doc[2]['documentation']="arreglo con la documentación de esta etiqueta en caso que los hubiera";
		doc[2]['overview']="lista rápida de los estilosque afectan a esta etiqueta";
		doc[2]['hierarchy']="posición en la descendencia [1] es padre [2]descendencia 1 [3]descendencia 2";
		doc[2]['name']="nombre de la etiqueta en caso que tuviera";
		doc[2]['version']="versión de la etiqueta";
		//Nivel en la  descendencia, ejemplo el primer hijo es 2
		doc[2]['level']={L0:2,L1:1,L2:1};
		
		
		//////////////////////////////////////      3    /////////////////////////////////////
		doc[3]={};
		doc[3]['tag']="input";
		doc[3]['tagText']="";
		//arreglos con los atributos en pares atributo/valor
		doc[3]['attributes']={'id' :'otro','type':'checkbox'};
		doc[3]['comments']="che";
		doc[3]['documentation']="arreglo con la documentación de esta etiqueta en caso que los hubiera";
		doc[3]['overview']="lista rápida de los estilosque afectan a esta etiqueta";
		doc[3]['hierarchy']="posición en la descendencia [1] es padre [2]descendencia 1 [3]descendencia 2";
		doc[3]['name']="nombre de la etiqueta en caso que tuviera";
		doc[3]['version']="versión de la etiqueta";
		//Nivel en la  descendencia, ejemplo el primer hijo es 2
		doc[3]['level']={L0:2,L1:1,L2:2};
		
		
		//////////////////////////////////////      4    /////////////////////////////////////
		doc[4]={};
		doc[4]['tag']="div";
		doc[4]['tagText']="este es el texto dentro de la etiqueta en caso que hubiera";
		//arreglos con los atributos en pares atributo/valor
		doc[4]['attributes']="";
		doc[4]['comments']="en caso de que tenga comentarios a insertar en el html";
		doc[4]['documentation']="arreglo con la documentación de esta etiqueta en caso que los hubiera";
		doc[4]['overview']="lista rápida de los estilosque afectan a esta etiqueta";
		doc[4]['hierarchy']="posición en la descendencia [1] es padre [2]descendencia 1 [3]descendencia 2";
		doc[4]['name']="nombre de la etiqueta en caso que tuviera";
		doc[4]['version']="versión de la etiqueta";
		//Nivel en la  descendencia, ejemplo el padre es 1
		doc[4]['level']={L0:1,L1:2};
		
		return doc;
	}
	
	this.position=function(selector,value)
	{
		return document.getElementById('here');
	}
	
	//funcion que inserta el template creado
	this.embed=function()
	{
		
		//arreglo con la informacion de las etiquetas
		var dom=this.dom();	
		
		//cantidad de nodos(etiquetas) que hay en el arreglo
		var nodos=parseInt(dom[0]['nodes']);
			
		//recorrer los nodos para ir agregandolos se crea el primer nodo, luego toda su descendencia antes de
		//pasar al siguiente nodo
		for(i=1;i<=nodos;i++)
		{	
			//elemento de posicion base a incrustar
			var position=this.position();		
					
			//definir la posicion donde estara el elemento
			
			//nivel, se resta 1 al L0 ya que si es nivel 1, es hijo directo, por lo que seria posicion 0
			var length=(parseInt(dom[i]['level']['L0']))-1;
			
			//cuando no es primer hijo del elemento raíz
			for(j=1;j<=length;j++)
			{				
				//se le agrega siempre el las posicion cero (0) dado a que el arreglo viene de forma ordenada
				position=position.children[0];				
			}
			
			//se inserta el comentario si es que existe
			if(dom[i]['comments']!=="")	
			{
				var comments = document.createComment(dom[i]['comments']);
				position.appendChild(comments);
			}
			
			//referencia a la etiqueta a crear
			var createTag = document.createElement(dom[i]['tag']);
			
			//lugar donde se va a insertar la etiqueta creada e insertarla de una vez
			var newTag=position.appendChild(createTag);
			
			
			//Se asigna atributos en caso que hubiere
			if(dom[i]['attributes']!=="")
			{
				for(a in dom[i]['attributes'])
				{
					//agregando atributos
					newTag.setAttribute(a,dom[i]['attributes'][a]);
				}
			}
			
			
			//verificar si se le va a añadir texto a la etiqueta
			if(dom[i]['tagText']!=="")
			{
				var tagText = document.createTextNode(dom[i]['tagText']);
				//insertar el texto en la etiqueta
				newTag.appendChild(tagText);
			}	
			
			
		}
		
		
	}
}