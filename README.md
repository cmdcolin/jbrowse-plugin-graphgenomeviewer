# jbrowse-plugin-graphgenomeviewer

WIP for displaying graph genome as a view in JBrowse 2

## Screenshot

![](img/1.png)

## Concept

The code adds a small server component which can read a .vg file, and a genomic
region, and then it will use the `vg chunk` command to extract the region into a
web based bandage-like graph genome viewer
https://github.com/cmdcolin/graphgenomeviewer

## Thanks

To the StableGenomics team for their PAG workshop helping explain some vg
toolkit commands and concepts https://github.com/StableGenomics/PangPAG

## TODOs

Shortlist of TODOs

- Allow users to load their own vg files. Currently hardcodes chr21 from HPRC
- Easier navigation between the linear genome view and graph genome panel
- Ability to launch a synteny-style view from the graph
- Ability to use decompose graph into VCF track
- Ability to show paths/walks
- Debug issue where vg chunk GFA output not loadable in bandage
- Improve scalability
- Bi-directional mouseover from genome to graph and back
- Less chunk-y-ness from the vg chunk graph (?)
