import requests, pathlib, re

families = [
	{
'name': 'fa-brands-400',
'slug': "fa-brands-400",
},
	{
'name': 'fa-regular-400',
'slug': "fa-regular-400",
},
	{
'name': 'fa-solid-900',
'slug': "fa-solid-900",
},
]

agents = {
'woff': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
'ttf': 'python',
'woff2': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
'eot':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
'svg':'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7',
}
find_url = re.compile(r"url\((?P<url>.*?)\)")

# def get_css(agent, family, variant):
# 	r = requests.get("https://fonts.googleapis.com/css?family=" + family + variant + "&subset=latin-ext",
# 		headers = {'user-agent': agent})
# 	r.raise_for_status()
# 	return r.text

def fetch_font(result_folder, extension, url, slug):
	r = requests.get(url, stream=True)
	r.raise_for_status()
	with (result_folder / (slug + "." + extension)).open(mode='wb') as out:
		for chunk in r.iter_content(chunk_size=128):
			out.write(chunk)

# def write_css(result_folder, csses, slug):
# 	with (result_folder / (slug + ".css")).open(mode='w') as out:
# 		out.write(csses['woff2'])

# def download_url_from(css):
# 	last = None
# 	for current in find_url.finditer(css):
# 		last = current
# 	return last.group('url')

def get_one_family(family, variant, slug):
	result_folder = pathlib.Path(pathlib.Path.home() / 'Downloads' / 'web-fonts')
	result_folder.mkdir(exist_ok=True)
	# all_css = dict((k, get_css(v, family, variant)) for k, v in agents.items())
	# write_css(result_folder, all_css, slug)
	for ext, agent in agents.items():
		fetch_font(result_folder, ext, "https://use.fontawesome.com/releases/v5.1.0/webfonts/" + family + "." + ext, slug)

def main():
	for family in families:
		get_one_family(family['name'], "family['variant']", family['slug'])

if __name__ == "__main__":
	main()
