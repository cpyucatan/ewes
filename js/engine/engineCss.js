function engineCss()
{
	//customStyle
	//customStyle debe ser un arreglo con pares y valores de estilos en css, Ejemplo : [{color: 'red'}{background-color:#000}] 
	
	//variable que inicializa un array que contendralas variables personalizadas
	this.variable=[];
	
	//Arreglo que contendrá las variables personalizadas, solo un arreglo par/valor por instancia
	this.setVariable=function(customKey,customValue)
	{
		//customKey es un string que será el nombre de la variable
		//customValue es un string/numero que será el valor de la variable
		
		//Si existe una variable con ese nombre, arroja un error
		if(!this.variable[customKey])
		{
			this.variable[customKey]=customValue;
		}
		
		
	};
	
	
	//crea e inserta una etiqueta STYLE en la hoja
	this.setStyle=function (style)
	{	
		//variable style tiene forma forma 'input{color:'red'}'
		this.styleContent= style ? style : " ";
		this.styleTag = "STYLE";
		var lineBreak="\r\n";
		var ct = document.createElement(this.styleTag);
		var sc = document.createTextNode(this.styleContent);
		
		ct.appendChild(sc);
		document.head.appendChild(ct);
	}
	
	//lee un archivo desde una url dada
	this.readFromUrl=function(url)
	{
		function nueva(b){alert(b.responseText + b.status + b.statusText + b.readyState);}
		
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(data) 
		{			
			if (this.readyState == 4 && this.status == 200) 
			{
				if(this.responseText!==undefined){nueva(this);	}			
			}
			
		};
		
		xhttp.open("GET", url, true);
		xhttp.send();
	}
	
	//leer desde un input tipo file
	this.readFromInput=function(input)
	{		

		var file = document.getElementById(input).files[0];
		//alert(document.getElementById(input).value);
		
		var reader = new FileReader();
		reader.onload = function(progressEvent)
		{
			// Entire file
			console.log(this.result);
		
			// By lines
			var lines = this.result.split('\n');
			for(var line = 0; line < lines.length; line++)
			{
		  		console.log("linea "+lines[line]);
			}
		};
		reader.readAsText(file);
		
	}
	
	this.getIframe=function(id)
	{
		var x = document.getElementById(id);
		var y = (x.contentWindow || x.contentDocument);
		if (y.document)y = y.document;
		return y;
	}
	
	//funcion descargar
	this.download=function(style,aTarget,name)
	{	
		//aTaget la etiqueta a que se le pondra la descarga
		//name es el nombre del archivo
		//style es el texto
		
		//tipo de mime
		const MIME_TYPE = 'text/plain';		
		
		//contenido mas el tipo de mime
		var bb = new Blob([style], {type: MIME_TYPE});

		//etiqueta <a>, a la cual tendrá la opción de descarga
		var a = document.getElementById(aTarget);
		var lineBreak="\r\n";
		//nombre del archivo
		a.download = name+".css";
		
		//crea la url
		window.URL = window.webkitURL || window.URL;
		a.href = window.URL.createObjectURL(bb);
		//cambia el textode la etiqueta
		a.textContent = 'Download ready';		
		//inserta la url nueva a la existente
		a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
		
		
		//asigna que se descargue en la funcion onclick
		a.addEventListener('click', function(e) 
		{
			e.dataset.disabled = true;
			window.URL.revokeObjectURL(e.href);
		});
	}
	
	
	var customStyle=function()
	{
		/*this.a=function(valor)
		{ 
			var valor = valor ? valor : null;
			var referencia;
			
			if(valor===null)
			{
				return "valor";
			}
		};*/
		
		this.set=function(valor)
		{
			/*if(typeof(valor)==='object')
			{
				alert("si");
			}
			else{alert("no");}*/
			
			if(valor['color'])
			{
				this.color=valor['color'];
			}
			
			if(valor['backgroundColor']){/*alert("tambien");*/}
			
			
			
		}
		
		
		this.color=null;
		this.backgroundColor=null;
		this.backgroundImage=null;
		this.position=null;
		this.display=null;
		this.float=null;
		this.left=null;
		this.height=null;
		this.width=null;
		this.borderRadius=null;
		this.fontFamily=null;
		this.fontSize=null;
		
		
	}
	
	
	var customSelector=function()
	{
		this.and=", ";
		this.universal="*";
		this.className=" .";
		this.id="#";
		this.adjacentSibling="+";
		this.nextSiblings="~";
		this.children=">";
		this.descendant=" ";
		this.name=null;
		
		this.combine=function(father,son)
		{
			//combinar todas las posibilidades de cierta cantidad de selectores
		}
	}
}