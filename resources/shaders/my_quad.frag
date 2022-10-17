#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

void main()
{
	float color_r[25];
	float color_g[25];
	float color_b[25];
	int n = 5;
	ivec2 size = textureSize(colorTex, 0);
	int k = 0;
	for(int i = 0; i < n; i++)
		for(int j = 0; j < n; j++)
		{
					float x = surf.texCoord.x + i/size.x;
					float y = surf.texCoord.y + j/size.y;
					vec2 coord = vec2(x, y);
					vec4 pix_color = textureLod(colorTex, coord, 0);
					color_r[k]=pix_color.x;
					color_g[k] = pix_color.y;
					color_b[k] = pix_color.x;
					k++ 
		}
	for(int k =0; k < 25; k++)
		for(int  b = 0; b<25 - k; b++)
		{
						if(color_r[k] > color_r[k+1])
						{
							float t = color_r[k];
							color_r[k] = color_r[k+1];
							color_r[k+1] = t;
						}
						if(color_g[k] > color_g[k+1])
						{
							float t = color_g[k];
							color_g[k] = color_g[k+1];
							color_g[k+1] = t;
						}
						if(color_b[k] > color_b[k+1])
						{
							float t = color_b[k];
							color_b[k] = color_b[k+1];
							color_b[k+1] = t;
						}
		}
						
  color = vec4(color_r[13],color_g[13], color_b[13],1);

}

